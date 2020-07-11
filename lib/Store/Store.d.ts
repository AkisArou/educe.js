/// <reference types="react" />
import { ENTIRE_STATE } from "../Eventing/ENTIRE_STATE";
export declare abstract class Store<T extends object> {
    protected abstract state: T;
    protected constructor(needsHistory?: boolean);
    private readonly eventing;
    readonly subscribe: <K extends keyof T>(subProps: typeof ENTIRE_STATE | K | K[], listener: import("react").Dispatch<import("react").SetStateAction<T>>) => void;
    readonly unsubscribe: <K extends keyof T>(unsubscribableProps: Set<typeof ENTIRE_STATE | K | K[]>, listener: import("react").Dispatch<import("react").SetStateAction<T>>) => void;
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
    protected clearStateHistory(): void;
    /**************
     * @statics
     * Dynamic store generation and removal by constructor arguments.
     *********** */
    private static stores;
    static get<S extends Store<any>>(StoreConstructor: new (...args: any[]) => S): S;
    static getAddRef<S extends Store<any>>(StoreConstructor: new (...args: any[]) => S): S;
    static removeRefDelete<S extends Store<any>>(StoreConstructor: new (...args: any[]) => S): void;
}
//# sourceMappingURL=Store.d.ts.map