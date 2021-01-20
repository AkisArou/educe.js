import { Store } from "../Store/Store";
export declare type StoreConstructor<T extends object> = (new (...args: any[]) => Store<T>);
export declare type StoreApproved<S extends object> = StoreConstructor<S>;
//# sourceMappingURL=index.d.ts.map