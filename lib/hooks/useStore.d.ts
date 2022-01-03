import { Store } from "../Store/Store";
import { StoreEvent } from "../Store/types";
import { ENTIRE_STATE } from "../constants/ENTIRE_STATE";
declare type OmittedProps<S extends object, E extends StoreEvent> = "state" | "mapEventToState" | keyof Pick<Store<S, StoreEvent>, "requestCleanup" | "requestEffect" | "_state" | "subscribe" | "unsubscribe">;
export declare type SubProps<S extends object> = (keyof S)[] | keyof S | typeof ENTIRE_STATE | null;
export interface UseStoreProps<S extends object> {
    readonly dynamicProps?: SubProps<S>;
    readonly withEffects?: boolean;
    readonly listen?: boolean;
}
export declare function useStore<S extends object, E extends StoreEvent, StoreClass extends new (...args: any[]) => Store<S, E>>(storeClass: StoreClass | (new () => Store<S, E>), { dynamicProps, withEffects, listen }?: UseStoreProps<S>): readonly [S, Omit<InstanceType<StoreClass>, OmittedProps<S, E>>];
export {};
//# sourceMappingURL=useStore.d.ts.map