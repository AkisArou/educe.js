import React from "react";
import {StoreEvent} from "../Store/types";
import {StoreConstructor} from "../types";
import {useStore, UseStoreProps} from "../hooks/useStore";

export interface InjectedStoreProps<S> {
    storeState?: S;
}

type withStoreHOCDecoratorReturnType<S extends object> = <T extends InjectedStoreProps<S> = InjectedStoreProps<S>>(WrappedComponent: React.ComponentType<T>) => void


function withStore<S extends object, E extends StoreEvent>(store: StoreConstructor<S, E>, storeProps: UseStoreProps<S> = {}): withStoreHOCDecoratorReturnType<S> {
    return <T extends InjectedStoreProps<S> = InjectedStoreProps<S>>(WrappedComponent: React.ComponentType<T>) => {
        return (props: T) => {
            const _storeData = useStore(store, storeProps);
            return <WrappedComponent {...(props) as T} storeState={{...props.storeState, ..._storeData}}/>
        };
    }
}

export {withStore};