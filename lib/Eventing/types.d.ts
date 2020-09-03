import { ENTIRE_STATE } from "../constants/ENTIRE_STATE";
declare type StateReceiverFunction<T> = (state: T) => any;
export declare type StateSetter<V> = StateReceiverFunction<V>;
export declare type SymbolicSetters<T> = {
    [ENTIRE_STATE]: Set<StateSetter<T>>;
};
export declare type DynamicKeySetters<T> = {
    [p in keyof T]: Set<StateSetter<T>>;
};
export declare type IStateSetters<T> = DynamicKeySetters<T> & SymbolicSetters<T>;
export {};
//# sourceMappingURL=types.d.ts.map