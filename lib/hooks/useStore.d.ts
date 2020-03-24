import Store from "../Store/Store";
import { ENTIRE_STORE_LISTENERS } from "../Eventing/ENTIRE_STORE_LISTENERS";
declare type OmittedProps = "state" | "requestCleanup" | "requestEffect" | "immutableState" | "subscribe" | "unsubscribe";
export declare type SubProps<IStoreType> = (keyof IStoreType)[] | keyof IStoreType | typeof ENTIRE_STORE_LISTENERS | null;
declare function useStore<S extends object, StoreClass extends new (...args: any[]) => Store<S>>(store: (new () => Store<S>) | StoreClass, dynamicProps?: SubProps<S>, withEffects?: boolean, listen?: boolean): readonly [S, Omit<InstanceType<StoreClass>, OmittedProps>];
declare function useStore<S extends object, StoreClass extends new (...args: any[]) => Store<S>>(store: Store<S>, dynamicProps?: SubProps<S>, withEffects?: boolean, listen?: boolean): S;
export default useStore;
//# sourceMappingURL=useStore.d.ts.map