import {StatePersisted} from "../decorators";
import {GenericStoreClass} from "../types";

export const storageIdentifierGenerator = (dbVer: number, cls: GenericStoreClass) =>
    "react-store|" + cls.name + "|db.v" + dbVer;


export class Persistence {
    public static readonly Persist = StatePersisted;

    /* Helpers */
    public static clearStorePersistedState(dbVer: number, cls: GenericStoreClass) {
        localStorage.removeItem(storageIdentifierGenerator(dbVer, cls));
    }
}
