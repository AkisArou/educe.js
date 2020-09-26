import { StoreConstructor } from "../types";
import { PersistenceTransformers, StoreDatabase } from "../Persistence/types";
interface StatePersistedConfig<T extends object> {
    readonly databaseName: string;
    readonly databaseVersion?: number;
    readonly database?: StoreDatabase;
    readonly transformers?: PersistenceTransformers<T>;
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
export declare function StatePersisted<T extends object>(config: StatePersistedConfig<T>): <S extends object>(target: StoreConstructor<S>) => any;
export {};
//# sourceMappingURL=StatePersisted.d.ts.map