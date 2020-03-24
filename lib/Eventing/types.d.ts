import React, { SetStateAction } from "react";
import { ENTIRE_STORE_LISTENERS } from "./ENTIRE_STORE_LISTENERS";
export declare type StateSetter<V> = React.Dispatch<SetStateAction<V>>;
export declare type SymbolicSetters<T> = {
    [ENTIRE_STORE_LISTENERS]: Set<StateSetter<T>>;
};
export declare type DynamicKeySetters<T> = {
    [p in keyof T]: Set<StateSetter<T>>;
};
export declare type IStateSetters<T> = DynamicKeySetters<T> & SymbolicSetters<T>;
//# sourceMappingURL=types.d.ts.map