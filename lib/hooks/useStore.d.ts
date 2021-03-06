import { Store } from "../Store/Store";
import { ENTIRE_STATE } from "../constants/ENTIRE_STATE";
declare type OmittedProps = "state" | keyof Pick<Store<any>, "requestCleanup" | "requestEffect" | "immutableState" | "subscribe" | "unsubscribe">;
export declare type SubProps<IStoreType> = (keyof IStoreType)[] | keyof IStoreType | typeof ENTIRE_STATE | null;
declare function useStore<S extends object, StoreClass extends new (...args: any[]) => Store<S>>(store: (new () => Store<S>) | StoreClass, dynamicProps?: SubProps<S>, withEffects?: boolean, listen?: boolean): readonly [S, Omit<InstanceType<StoreClass>, OmittedProps>];
declare function useStore<S extends object, StoreClass extends new (...args: any[]) => Store<S>>(store: Store<S>, dynamicProps?: SubProps<S>, withEffects?: boolean, listen?: boolean): S;
export { useStore };
//# sourceMappingURL=useStore.d.ts.map