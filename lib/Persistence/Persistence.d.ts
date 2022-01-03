import { StatePersisted } from "./StatePersisted";
import { PersistenceTransformers, PersistenceTransformGet, PersistenceTransformSet, StoreDatabase } from "./types";
export declare const storageIdentifierGenerator: (dbName: string, dbVer: number) => string;
export declare class Persistence {
    /**Persistence decorator for Store subclasses*/
    static readonly Persisted: typeof StatePersisted;
    /**Default database used for persistence. Used internally in StatePersistedDecorator*/
    private static defaultDatabase?;
    static getDefaultDatabase(): StoreDatabase | undefined;
    static setDefaultDatabase(database: StoreDatabase): void;
    static clearStorePersistedState<T extends object>(dbName: string, dbVer: number, database?: StoreDatabase): void;
    static createTransform<T extends object>(onGet: PersistenceTransformGet<T>, onSet: PersistenceTransformSet<T>): PersistenceTransformers<T>;
}
//# sourceMappingURL=Persistence.d.ts.map