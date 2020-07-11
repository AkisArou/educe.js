import {useEffect, useMemo, useRef, useState} from "react";
import {Store} from "../Store/Store";
import {ENTIRE_STATE} from "../Eventing/ENTIRE_STATE";

type OmittedProps = | "state" | "requestCleanup" | "requestEffect" | "immutableState" | "subscribe" | "unsubscribe";

export type SubProps<IStoreType> =
    | (keyof IStoreType)[]
    | keyof IStoreType
    | typeof ENTIRE_STATE
    | null;

function useStore<S extends object, StoreClass extends new (...args: any[]) => Store<S>>(
    store: (new () => Store<S>) | StoreClass,
    dynamicProps?: SubProps<S>,
    withEffects?: boolean,
    listen?: boolean
): readonly [S, Omit<InstanceType<StoreClass>, OmittedProps>];
function useStore<S extends object, StoreClass extends new (...args: any[]) => Store<S>>(
    store: Store<S>,
    dynamicProps?: SubProps<S>,
    withEffects?: boolean,
    listen?: boolean
): S
function useStore<S extends object, StoreClass extends new (...args: any[]) => Store<S>>(
    store: Store<S> | (new () => Store<S>) | StoreClass,
    dynamicProps?: SubProps<S>,
    withEffects?: boolean,
    listen: boolean = true
): readonly [S, Omit<InstanceType<StoreClass>, OmittedProps>] | S {
    const [actualStore] = useState<Store<S>>(() => typeof store === "function" ? Store.getAddRef(store) : store)
    const [data, setState] = useState<S>(() => actualStore.immutableState);
    const {current: memoizedUnsubscribableProps} = useRef(new Set<keyof S | typeof ENTIRE_STATE>());

    const handler = {
        get(target: S, prop: keyof S) {
            if (listen && !memoizedUnsubscribableProps.has(prop) && !memoizedUnsubscribableProps.has(ENTIRE_STATE)) {
                actualStore.subscribe(prop, setState);
                memoizedUnsubscribableProps.add(prop);
            }
            return data[prop];
        }
    };

    useEffect(() => {
        if (dynamicProps && listen) {
            actualStore.subscribe(dynamicProps, setState);

            if (Array.isArray(dynamicProps))
                dynamicProps.forEach(prop => memoizedUnsubscribableProps.add(prop));
            else memoizedUnsubscribableProps.add(dynamicProps);
        }

        withEffects && actualStore.requestEffect();

        return () => {
            listen && actualStore.unsubscribe(memoizedUnsubscribableProps, setState);
            withEffects && actualStore.requestCleanup();
            if (typeof store === "function") Store.removeRefDelete(store);
        };
    }, [withEffects, listen]);


    return typeof store === "function"
        ? [new Proxy(data, handler), actualStore as InstanceType<StoreClass> as Omit<InstanceType<StoreClass>, OmittedProps>] as const
        : new Proxy(data, handler);
}

export {useStore};