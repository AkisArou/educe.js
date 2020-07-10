import { Store } from "../Store/Store";
declare type StoreCls<S extends object> = (new () => Store<S>);
export declare function StatePersisted<S extends object>(target: StoreCls<S>): StoreCls<S>;
export {};
//# sourceMappingURL=index.d.ts.map