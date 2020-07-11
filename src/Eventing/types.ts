import React, {SetStateAction} from "react";
import {ENTIRE_STATE} from "../Eventing/ENTIRE_STATE";

export type StateSetter<V> = React.Dispatch<SetStateAction<V>>;

export type SymbolicSetters<T> = {
    [ENTIRE_STATE]: Set<StateSetter<T>>;
}

export type DynamicKeySetters<T> = {
    [p in keyof T]: Set<StateSetter<T>>;
}

export type IStateSetters<T> = DynamicKeySetters<T> & SymbolicSetters<T>
