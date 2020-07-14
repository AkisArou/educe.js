import React from "react";
import {useStore, SubProps} from "../hooks/useStore";
import {Store} from "../Store/Store";

export interface InjectedStoreProps<S> {
    storeData?: S;
}

const withStore = <S extends object>(store: (() => Store<S>) | Store<S>, dynamicProps?: SubProps<S>, withEffects?: boolean, listen: boolean = true)
    : <T extends InjectedStoreProps<S> = InjectedStoreProps<S>>(WrappedComponent: React.ComponentType<T>) => void => {
    return <T extends InjectedStoreProps<S> = InjectedStoreProps<S>>(WrappedComponent: React.ComponentType<T>) => {
        return (props: T) => {
            const _storeData = useStore((typeof  store=== "function" ? store() : store), dynamicProps, withEffects, listen);
            return <WrappedComponent {...(props) as T} storeData={_storeData}/>
        };
    }
};

export {withStore};