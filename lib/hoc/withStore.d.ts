import React from "react";
import { Store } from "../Store/Store";
export interface InjectedStoreProps<S> {
    storeData?: S;
}
declare const withStore: <S extends object>(store: () => Store<S>, dynamicProps?: typeof import("..").ENTIRE_STORE_LISTENERS | (keyof S)[] | keyof S | null | undefined, withEffects?: boolean | undefined, listen?: boolean) => <T extends InjectedStoreProps<S> = InjectedStoreProps<S>>(WrappedComponent: React.ComponentType<T>) => void;
export { withStore };
//# sourceMappingURL=withStore.d.ts.map