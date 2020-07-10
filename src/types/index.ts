import {Store} from "../Store/Store";

// Not used in useStore. Just generic Store Class
export type GenericStoreClass = (new (...args: any[]) => Store<object>);