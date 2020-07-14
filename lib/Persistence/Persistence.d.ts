import { StatePersisted } from "@decorators/index";
import { GenericStoreClass } from "@types_/";
import { PersistenceTransformers, PersistenceTransformGet, PersistenceTransformSet } from "@Persistence/types";
export declare const storageIdentifierGenerator: <T extends object>(dbVer: number, cls: GenericStoreClass<T>) => string;
export declare class Persistence {
    static readonly Persisted: typeof StatePersisted;
    static clearStorePersistedState<T extends object>(dbVer: number, cls: GenericStoreClass<T>): void;
    static createTransform<T extends object>(onGet: PersistenceTransformGet<T>, onSet: PersistenceTransformSet<T>): PersistenceTransformers<T>;
}
//# sourceMappingURL=Persistence.d.ts.map