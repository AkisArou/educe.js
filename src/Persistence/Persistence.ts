import {StatePersisted} from "@decorators/index";
import {GenericStoreClass} from "@types_/";
import {PersistenceTransformers, PersistenceTransformGet, PersistenceTransformSet} from "@Persistence/types";
import {PersistenceConst} from "@Persistence/constants";

export const storageIdentifierGenerator = <T extends object>(dbVer: number, cls: GenericStoreClass<T>) =>
    PersistenceConst.libName + cls.name + PersistenceConst.dbVersion + dbVer;


// TODO: check for adding storage property: IDatabase, allowing setting custom database.
// The problem is getting-setting in db because of the non-asynchronous Proxy construct
// in Persisted decorator.


export class Persistence {
    public static readonly Persisted = StatePersisted;

    public static clearStorePersistedState<T extends object>(dbVer: number, cls: GenericStoreClass<T>) {
        localStorage.removeItem(storageIdentifierGenerator(dbVer, cls));
    }

    public static createTransform<T extends object>(onGet: PersistenceTransformGet<T>, onSet: PersistenceTransformSet<T>): PersistenceTransformers<T> {
        return {onGet, onSet};
    }
}
