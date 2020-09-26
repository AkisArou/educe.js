import { StatePersisted } from "../decorators/StatePersisted";
import { PersistenceTransformers, PersistenceTransformGet, PersistenceTransformSet, StoreDatabase } from "../Persistence/types";
export declare const storageIdentifierGenerator: (dbName: string, dbVer: number) => string;
export declare class Persistence {
    /**Persistence decorator for Store subclasses*/
    static readonly Persisted: typeof StatePersisted;
    /**Default database used for persistence. Used internally in StatePersistedDecorator*/
    private static defaultDatabase?;
    static getDefaultDatabase(): import("./types").ISyncDatabase | import("./types").IAsyncDatabase | undefined;
    static setDefaultDatabase(database: StoreDatabase): void;
    static clearStorePersistedState<T extends object>(dbName: string, dbVer: number, database?: StoreDatabase): void;
    static createTransform<T extends object>(onGet: PersistenceTransformGet<T>, onSet: PersistenceTransformSet<T>): PersistenceTransformers<T>;
}
//# sourceMappingURL=Persistence.d.ts.map