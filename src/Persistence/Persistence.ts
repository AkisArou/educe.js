import {StatePersisted} from "../decorators/StatePersisted";
import {StoreConstructor, StoreStatic} from "../types";
import {PersistenceTransformers, PersistenceTransformGet, PersistenceTransformSet} from "../Persistence/types";
import {PersistenceConst} from "../Persistence/constants";

export const storageIdentifierGenerator = (dbName: string, dbVer: number) =>
    PersistenceConst.libName + dbName + PersistenceConst.dbVersion + dbVer;


// TODO: check for adding storage property: IDatabase, allowing setting custom database.
// The problem is getting-setting in db because of the non-asynchronous Proxy construct
// in Persisted decorator.


export class Persistence {
    public static readonly Persisted = StatePersisted;

    public static clearStorePersistedState<T extends object>(dbName: string, dbVer: number) {
        localStorage.removeItem(storageIdentifierGenerator(dbName, dbVer));
    }

    public static createTransform<T extends object>(onGet: PersistenceTransformGet<T>, onSet: PersistenceTransformSet<T>): PersistenceTransformers<T> {
        return {onGet, onSet};
    }
}
