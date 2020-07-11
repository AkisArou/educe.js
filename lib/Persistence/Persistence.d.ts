import { StatePersisted } from "../decorators";
import { GenericStoreClass } from "../types";
export declare const storageIdentifierGenerator: (dbVer: number, cls: GenericStoreClass) => string;
export declare class Persistence {
    static readonly Persisted: typeof StatePersisted;
    static clearStorePersistedState(dbVer: number, cls: GenericStoreClass): void;
}
//# sourceMappingURL=Persistence.d.ts.map