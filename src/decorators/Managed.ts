import {StoreConstructor} from "../types";


/**@description
 * Decorator for Store subclasses.
 * Allows to be used in useStore, passed in as constructors and not instances.
 * */
export function Managed<T extends object>(ctor: StoreConstructor<T>) {
    Object.defineProperty(ctor, "_storeIdentifier", {
        value: Symbol(),
        writable: false
    });
}
