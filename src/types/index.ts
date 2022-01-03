import {Store} from "../Store/Store";
import {StoreEvent, StoreEvents} from "../Store/types";

export type StoreConstructor<T extends object, E extends DefaultStoreEvents> = (new (...args: any[]) => Store<T, E>);
export type DefaultStoreConstructor<S extends object = object> = StoreConstructor<S, StoreEvent>;
export type DefaultStoreEvents = StoreEvents<StoreEvent>


