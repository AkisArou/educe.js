/// <reference types="react" />
export default abstract class Store<T extends object> {
    protected abstract state: T;
    private readonly eventing;
    readonly subscribe: <K extends keyof T>(listener: import("react").Dispatch<import("react").SetStateAction<T>>, subProps: typeof import("..").ENTIRE_STORE_LISTENERS | K | K[]) => void;
    readonly unsubscribe: <K extends keyof T>(listener: import("react").Dispatch<import("react").SetStateAction<T>>, unsubscribableProps: Set<typeof import("..").ENTIRE_STORE_LISTENERS | K | K[]>) => void;
    get immutableState(): T;
    requestEffect(): void;
    requestCleanup(): void;
    /** @description Used for state property deletion in dynamic state properties.*/
    protected deletePropFromState(propName: keyof T): void;
    protected setState<K extends keyof T>(updateProps: Partial<T>): void;
    protected resetState<K extends keyof T>(initialState: T): void;
    /** @statics Dynamic store generation and removal by constructor arguments.*/
    private static stores;
    static get<S extends Store<any>>(StoreConstructor: new (...args: any[]) => S): S;
    static getAddRef<S extends Store<any>>(StoreConstructor: new (...args: any[]) => S): S;
    static removeRefDelete<S extends Store<any>>(StoreConstructor: new (...args: any[]) => S): void;
}
//# sourceMappingURL=Store.d.ts.map