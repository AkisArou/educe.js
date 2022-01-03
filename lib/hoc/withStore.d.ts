import React from "react";
import { StoreEvent } from "../Store/types";
import { StoreConstructor } from "../types";
import { UseStoreProps } from "../hooks/useStore";
export interface InjectedStoreProps<S> {
    storeState?: S;
}
declare type withStoreHOCDecoratorReturnType<S extends object> = <T extends InjectedStoreProps<S> = InjectedStoreProps<S>>(WrappedComponent: React.ComponentType<T>) => void;
declare function withStore<S extends object, E extends StoreEvent>(store: StoreConstructor<S, E>, storeProps?: UseStoreProps<S>): withStoreHOCDecoratorReturnType<S>;
export { withStore };
//# sourceMappingURL=withStore.d.ts.map