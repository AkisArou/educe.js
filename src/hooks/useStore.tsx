import {Store} from "../Store/Store";
import {StoreEvent} from "../Store/types";
import {ENTIRE_STATE} from "../constants/ENTIRE_STATE";
import {useEffect, useRef, useState} from "react";
import {ContainerHolder, SharedContainer} from "../Container/ContainerHolder";
import {Scope} from "../Container/Scope";

type OmittedProps<S extends object, E extends StoreEvent> =
    | "state"
    | "mapEventToState"
    | keyof Pick<Store<S, StoreEvent>, "requestCleanup" | "requestEffect" | "_state" | "subscribe" | "unsubscribe">;

export type SubProps<S extends object> =
    | (keyof S)[]
    | keyof S
    | typeof ENTIRE_STATE
    | null;

export interface UseStoreProps<S extends object> {
    readonly dynamicProps?: SubProps<S>;
    readonly withEffects?: boolean;
    readonly listen?: boolean;
}


export function useStore<S extends object, E extends StoreEvent, StoreClass extends new (...args: any[]) => Store<S, E>>(
    storeClass: StoreClass | (new () => Store<S, E>), {
        dynamicProps,
        withEffects = false,
        listen = true
    }: UseStoreProps<S> = {}): readonly [S, Omit<InstanceType<StoreClass>, OmittedProps<S, E>>] {
    const [store] = useState<Store<S, E>>(() => ContainerHolder.instance.get(storeClass));
    const [state, setState] = useState<S>(() => store._state);
    const {current: memoizedUnsubscribableProps} = useRef(new Set<keyof S | typeof ENTIRE_STATE>());

    const handler = {
        get(target: object, prop: string) {
            if (listen && !memoizedUnsubscribableProps.has(prop as keyof S) && !memoizedUnsubscribableProps.has(ENTIRE_STATE)) {
                store.subscribe(prop as keyof S, setState);
                memoizedUnsubscribableProps.add(prop as keyof S);
            }
            return state[prop as keyof S];
        }
    };

    useEffect(() => {
        if (!!dynamicProps && listen) {
            store.subscribe(dynamicProps, setState);

            if (Array.isArray(dynamicProps))
                dynamicProps.forEach(prop => memoizedUnsubscribableProps.add(prop));
            else
                memoizedUnsubscribableProps.add(dynamicProps);
        }

        if (withEffects)
            store.requestEffect()

        return () => {
            if (listen)
                store.unsubscribe(memoizedUnsubscribableProps, setState);

            if (withEffects)
                store.requestCleanup();


            const container = ContainerHolder.instance.getContainerByBoundClass(storeClass);

            if (container.type === Scope.SHARED)
                (container as SharedContainer).unGet(storeClass);

        };
    }, [withEffects, listen]);


    return [new Proxy(state, handler) as S, store as unknown as Omit<InstanceType<StoreClass>, OmittedProps<S, E>>] as const
}