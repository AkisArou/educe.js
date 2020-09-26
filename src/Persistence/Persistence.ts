import {StatePersisted} from "../decorators/StatePersisted";
import {StoreConstructor, StoreStatic} from "../types";
import {
    PersistenceTransformers,
    PersistenceTransformGet,
    PersistenceTransformSet,
    StoreDatabase
} from "../Persistence/types";
import {PersistenceConst} from "../Persistence/constants";

export const storageIdentifierGenerator = (dbName: string, dbVer: number) =>
    PersistenceConst.libName + dbName + PersistenceConst.dbVersion + dbVer;


export class Persistence {
    /**Persistence decorator for Store subclasses*/
    public static readonly Persisted = StatePersisted;

    /**Default database used for persistence. Used internally in StatePersistedDecorator*/
    private static defaultDatabase?: StoreDatabase;


    public static getDefaultDatabase() {
        return Persistence.defaultDatabase;
    }

    public static setDefaultDatabase(database: StoreDatabase) {
        Persistence.defaultDatabase = database;
    }


    public static clearStorePersistedState<T extends object>(dbName: string, dbVer: number, database?: StoreDatabase) {
        if (database)
            database.removeItem(storageIdentifierGenerator(dbName, dbVer));
        else if (Persistence.defaultDatabase)
            Persistence.defaultDatabase.removeItem(storageIdentifierGenerator(dbName, dbVer));
    }

    public static createTransform<T extends object>(onGet: PersistenceTransformGet<T>, onSet: PersistenceTransformSet<T>): PersistenceTransformers<T> {
        return {onGet, onSet};
    }
}
