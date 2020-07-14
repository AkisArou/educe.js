import { Store } from "@Store/Store";
import { ENTIRE_STATE } from "@Eventing/ENTIRE_STATE";
import { GenericStoreClass } from "@types_index";
declare type OmittedProps = "state" & Pick<Store<any>, "requestCleanup" | "requestEffect" | "immutableState" | "subscribe" | "unsubscribe">;
export declare type SubProps<IStoreType> = (keyof IStoreType)[] | keyof IStoreType | typeof ENTIRE_STATE | null;
declare function useStore<S extends object>(store: GenericStoreClass<S>, dynamicProps?: SubProps<S>, withEffects?: boolean, listen?: boolean): readonly [S, Omit<InstanceType<GenericStoreClass<S>>, OmittedProps>];
declare function useStore<S extends object>(store: Store<S>, dynamicProps?: SubProps<S>, withEffects?: boolean, listen?: boolean): S;
export { useStore };
//# sourceMappingURL=useStore.d.ts.map