import {storageIdentifierGenerator} from "../Persistence/Persistence";
import {StoreConstructor} from "../types";
import {PersistenceTransformers} from "../Persistence/types";
import {PersistenceConst} from "../Persistence/constants";


interface StatePersistedConfig<T extends object> {
    readonly databaseVersion?: number;
    readonly transformers?: PersistenceTransformers<T>;
}

export function StatePersisted<T extends object>(config?: StatePersistedConfig<T>) {
    return function <S extends object>(target: StoreConstructor<S>) {
        // Class returns as proxied
        return new Proxy(target, {
            // StoreCls left any, for accessing .state property
            construct(StoreCls: any, args: any[]) {
                // Default initial database version = 0
                const databaseVersion = config?.databaseVersion ?? 0;
                const transformer = config?.transformers;
                // Create instance
                const storeInstance = new StoreCls(...args);
                // Current identifier by databaseVersion
                const identifier = storageIdentifierGenerator(databaseVersion, StoreCls);
                // Try get persistedState by identifier, and use it for later state persistence setting
                const persistedState = localStorage.getItem(identifier);

                // Try delete previous deprecated persisted state
                if (!persistedState && databaseVersion > 0)
                    localStorage.removeItem(storageIdentifierGenerator(databaseVersion - 1, StoreCls));


                // Keep local state obj reference to be used in setter-getter
                let stateRef: T = !!persistedState
                    ? !!transformer ? transformer.onGet(JSON.parse(persistedState)) : JSON.parse(persistedState)
                    : storeInstance.state;

                // Define getter-setter for "state" property.
                // Getter: just for getting state
                // Setter: persists state
                Object.defineProperty(storeInstance, PersistenceConst.statePropertyKey, {
                    get() {
                        return stateRef;
                    },
                    set(v: T) {
                        stateRef = v;
                        localStorage.setItem(identifier,
                            !!transformer
                                ? JSON.stringify(transformer.onSet(v))
                                : JSON.stringify(v));
                    }
                } as const);

                return storeInstance;
            },
        });
    }
}