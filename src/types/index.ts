import {Store} from "../Store/Store";

// Not used in useStore. Just generic Store Class
export type GenericStoreClass<T extends object> = (new (...args: any[]) => Store<T>);