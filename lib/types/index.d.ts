import { Store } from "../Store/Store";
import { StoreEvent, StoreEvents } from "../Store/types";
export declare type StoreConstructor<T extends object, E extends DefaultStoreEvents> = (new (...args: any[]) => Store<T, E>);
export declare type DefaultStoreConstructor<S extends object = object> = StoreConstructor<S, StoreEvent>;
export declare type DefaultStoreEvents = StoreEvents<StoreEvent>;
//# sourceMappingURL=index.d.ts.map