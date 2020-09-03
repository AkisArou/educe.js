import {StoreConstructor} from "../types";

export function Managed<T extends object>(ctor: StoreConstructor<T>) {
    Object.defineProperty(ctor, "_storeIdentifier", {
        value: Symbol(),
        writable: false
    });
}