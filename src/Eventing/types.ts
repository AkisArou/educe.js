import React, {SetStateAction} from "react";
import {ENTIRE_STORE_LISTENERS} from "./ENTIRE_STORE_LISTENERS";

export type StateSetter<V> = React.Dispatch<SetStateAction<V>>;

export type SymbolicSetters<T> = {
    [ENTIRE_STORE_LISTENERS]: Set<StateSetter<T>>;
}

export type DynamicKeySetters<T> = {
    [p in keyof T]: Set<StateSetter<T>>;
}

export type IStateSetters<T> = DynamicKeySetters<T> & SymbolicSetters<T>


