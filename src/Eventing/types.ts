// import React, {SetStateAction} from "react";
import {ENTIRE_STATE} from "../constants/ENTIRE_STATE";

// type ReactStateReceiver<T> = React.Dispatch<SetStateAction<T>>;
type StateReceiverFunction<T> = (state: T) => any;
export type StateSetter<V> = StateReceiverFunction<V>;
    // | ReactStateReceiver<V>


export type SymbolicSetters<T> = {
    [ENTIRE_STATE]: Set<StateSetter<T>>;
}

export type DynamicKeySetters<T> = {
    [p in keyof T]: Set<StateSetter<T>>;
}

export type IStateSetters<T> = DynamicKeySetters<T> & SymbolicSetters<T>
