import {useEffect, useMemo, useState} from "react";
import {Store} from "../Store/Store";
import {ENTIRE_STORE_LISTENERS} from "../Eventing/ENTIRE_STORE_LISTENERS";

type OmittedProps = | "state" | "requestCleanup" | "requestEffect" | "immutableState" | "subscribe" | "unsubscribe";

export type SubProps<IStoreType> =
    | (keyof IStoreType)[]
    | keyof IStoreType
    | typeof ENTIRE_STORE_LISTENERS
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
    const actualStore = useMemo(() => typeof store === "function" ? Store.getAddRef(store) : store, []) as Store<S>;
    const [data, setState] = useState<S>(() => actualStore.immutableState);
    const memoizedUnsubscribableProps = useMemo(() => new Set<keyof S | typeof ENTIRE_STORE_LISTENERS>(), []);

    const handler = {
        get(target: S, prop: keyof S) {
            if (listen && !memoizedUnsubscribableProps.has(prop) && !memoizedUnsubscribableProps.has(ENTIRE_STORE_LISTENERS)) {
                actualStore.subscribe(setState, prop);
                memoizedUnsubscribableProps.add(prop);
            }
            return data[prop];
        }
    };

    useEffect(() => {
        if (dynamicProps && listen) {
            actualStore.subscribe(setState, dynamicProps);

            if (Array.isArray(dynamicProps))
                dynamicProps.forEach(prop => memoizedUnsubscribableProps.add(prop));
            else memoizedUnsubscribableProps.add(dynamicProps);
        }

        withEffects && actualStore.requestEffect();

        return () => {
            listen && actualStore.unsubscribe(setState, memoizedUnsubscribableProps);
            withEffects && actualStore.requestCleanup();
            if(typeof store === "function") Store.removeRefDelete(store);
        };
    }, [withEffects, listen]);


    return typeof store === "function"
        ? [new Proxy(data, handler), actualStore as InstanceType<StoreClass> as Omit<InstanceType<StoreClass>, OmittedProps>] as const
        : new Proxy(data, handler);
}

export {useStore};

