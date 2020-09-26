import { StoreConstructor } from "../types";
/**@description
 * Decorator for Store subclasses.
 * Allows to be used in useStore, passed in as constructors and not instances.
 * */
export declare function Managed<T extends object>(ctor: StoreConstructor<T>): void;
//# sourceMappingURL=Managed.d.ts.map