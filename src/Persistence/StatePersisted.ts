import {Persistence, storageIdentifierGenerator} from "./Persistence";
import {StoreConstructor} from "../types";
import {PersistenceTransformers, StoreDatabase} from "./types";
import {PersistenceConst} from "./constants";
import {StoreEvent} from "../Store/types";

export interface StatePersistedConfig<T extends object> {
    readonly databaseName: string;
    readonly databaseVersion?: number;
    readonly database?: StoreDatabase;
    readonly transformers?: PersistenceTransformers<T>;
}

// Internal for type safe StatePersisted Store props access.
interface StoreExposed<T extends object> {
    state: T;

    setState<K extends keyof T>(updateProps: Partial<T>): void;
}


/**@description
 * Decorator for Store subclasses.
 * Persists state on each setState call.
 * If provided database is synchronous, store gets instantiated with persisted state.
 * If database is asynchronous, store gets instantiated with initial state,
 * and when state is fetched, setState is internally called and updated.
 *
 * @param config {StatePersistedConfig}
 * databaseName: is used concatenated for storage key
 * databaseVersion: versioning for the current Store. if version changes, old stored state is automatically, deleted.
 * Can delete manually from Persistence.clearStorePersistedState
 * database: default is localStorage, can set it here or can set default database from static Persistence.setDefaultDatabase
 * transformers: transforms state before its saving and after its fetch.
 * Use Persistence.createTransform, to pass function transformers for set and get database transactions.
 * */
export function StatePersisted<T extends object>(config: StatePersistedConfig<T>) {
    return function <S extends object, E extends StoreEvent>(target: StoreConstructor<S, E>) {
        // Class returns as proxied
        return new Proxy(target, {
            // StoreCls left any, for accessing .state property
            construct(StoreCls: any, args: any[]) {
                // Get database to work with
                const database: StoreDatabase =
                    // If database from config, is under control
                    config.database
                    // if not, try get default database from Persistence
                    ?? Persistence.getDefaultDatabase()
                    // then try fallback to localStorage for web
                    ?? localStorage;

                // Default initial database version = 0
                const databaseVersion = config?.databaseVersion ?? 0;
                const transformer = config?.transformers;
                // Create instance
                const storeInstance: StoreExposed<T> = new StoreCls(...args);
                // Current identifier by databaseVersion
                const identifier = storageIdentifierGenerator(config.databaseName, databaseVersion);
                // Try get persistedState by identifier, and use it for later state persistence setting
                const persistedState = database.getItem(identifier);

                // Try delete previous deprecated persisted state
                if (!persistedState && databaseVersion > 0)
                    database.removeItem(storageIdentifierGenerator(config.databaseName, databaseVersion - 1));


                function parsePersistedState(stringifiedState: string) {
                    return !!transformer
                        ? transformer.onGet(JSON.parse(stringifiedState))
                        : JSON.parse(stringifiedState);
                }

                function stringifyStateToPersist(state: T) {
                    return !!transformer
                        ? JSON.stringify(transformer.onSet(state))
                        : JSON.stringify(state);
                }


                // State assignment depends on persistedState and if database is async
                let stateRef: T;

                if (persistedState instanceof Promise) {
                    stateRef = storeInstance.state;
                    persistedState
                        .then(state => !!state && storeInstance.setState(parsePersistedState(state)))
                        .catch(console.error);
                } else {
                    stateRef = !!persistedState
                        ? parsePersistedState(persistedState)
                        : storeInstance.state;
                }


                // Define getter-setter for "state" property.
                // Getter: just for getting state
                // Setter: persists and reassigns state
                Object.defineProperty(storeInstance, PersistenceConst.statePropertyKey, {
                    get() {
                        return stateRef;
                    },
                    set(v: T) {
                        stateRef = v;
                        database.setItem(identifier, stringifyStateToPersist(v));
                    }
                } as const);

                return storeInstance;
            },
        });
    }
}