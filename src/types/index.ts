import {Store} from "../Store/Store";

export type StoreConstructor<T extends object> = (new (...args: any[]) => Store<T>);
export type StoreStatic = typeof Store;
export type StoreApproved<S extends object> = StoreConstructor<S> & StoreStatic;



