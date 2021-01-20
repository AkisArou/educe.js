import { ENTIRE_STATE } from "../constants/ENTIRE_STATE";
import { StoreApproved } from "../types";
interface HistoryConfig {
    readonly enableHistory: boolean;
    readonly historyLimit: number;
}
export declare abstract class Store<T extends object> {
    protected abstract state: T;
    constructor(historyConfig?: HistoryConfig);
    private readonly eventing;
    readonly subscribe: <K extends keyof T>(listener: (state: T) => any, subProps: typeof ENTIRE_STATE | K | K[]) => void;
    readonly unsubscribe: <K extends keyof T>(listener: (state: T) => any, unsubscribableProps: Set<typeof ENTIRE_STATE | K | K[]>) => void;
    private readonly history?;
    private hasSavedFirstState;
    get immutableState(): T;
    requestEffect(): void;
    requestCleanup(): void;
    /** @description Used for state property deletion in dynamic state properties.*/
    protected deletePropFromState(propName: keyof T): void;
    protected setState<K extends keyof T>(updateProps: Partial<T>): void;
    protected resetState<K extends keyof T>(initialState: T): void;
    private onHistoryChangeCommit;
    protected previousState<K extends keyof T>(prop?: K | typeof ENTIRE_STATE): boolean;
    protected nextState<K extends keyof T>(prop?: K | typeof ENTIRE_STATE): boolean;
    protected stateAt<K extends keyof T>(idx: number, prop?: K | typeof ENTIRE_STATE): boolean;
    protected queryPreviousState(fn: (state: T) => boolean): boolean;
    protected clearStateHistory(): void;
    /**************
     * @statics
     * Dynamic store generation and removal by constructor arguments.
     *********** */
    private static stores;
    static get<S extends object, StoreClass extends new () => Store<S>>(StoreConstructor: StoreApproved<S> | StoreClass | (new () => Store<S>)): InstanceType<StoreClass>;
    static getAddRef<S extends object>(StoreConstructor: StoreApproved<S>): Store<S>;
    static removeRefDelete<S extends object>(StoreConstructor: StoreApproved<S>): void;
}
export {};
//# sourceMappingURL=Store.d.ts.map