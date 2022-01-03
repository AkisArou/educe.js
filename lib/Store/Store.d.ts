import { ENTIRE_STATE } from "../constants/ENTIRE_STATE";
import { HistoryConfig } from "./types";
import { IStoreLifecycleObserver } from "./IStoreLifecycleObserver";
import { DefaultStoreEvents } from "../types";
export declare abstract class Store<T extends object, E extends DefaultStoreEvents> {
    private static globalLifecycleObservers;
    static addGlobalLifecycleObserver(lifecycleObserver: IStoreLifecycleObserver<object, DefaultStoreEvents>): void;
    private lifecycleObserver?;
    protected addLifecycleObserver(lifecycleObserver: IStoreLifecycleObserver<T, E>): void;
    protected enableHistory(historyConfig: HistoryConfig): void;
    protected abstract state: T;
    private setNextState;
    private readonly eventing;
    readonly subscribe: <K extends keyof T>(subProps: typeof ENTIRE_STATE | K | K[], listener: import("../Eventing/types").StateSetter<T>) => void;
    readonly unsubscribe: <K extends keyof T>(unsubscribableProps: Set<typeof ENTIRE_STATE | K | K[]>, listener: import("../Eventing/types").StateSetter<T>) => void;
    private history?;
    private hasSavedFirstState;
    get _state(): T;
    requestEffect(): void;
    requestCleanup(): void;
    /** @description Used for state property deletion in dynamic state properties.*/
    protected deletePropFromState(propName: keyof T): void;
    protected setState<K extends keyof T>(updateProps: Partial<T>): void;
    protected resetState<K extends keyof T>(initialState: T): void;
    protected abstract mapEventToState(event: E): void;
    addEvent(event: E): void;
    /**
     * @return If has history
     */
    private onHistoryChangeCommit;
    protected previousState<K extends keyof T>(prop?: K | typeof ENTIRE_STATE): boolean;
    protected nextState<K extends keyof T>(prop?: K | typeof ENTIRE_STATE): boolean;
    protected stateAt<K extends keyof T>(idx: number, prop?: K | typeof ENTIRE_STATE): boolean;
    protected queryPreviousState(fn: (state: T) => boolean): boolean;
    protected clearStateHistory(): void;
}
//# sourceMappingURL=Store.d.ts.map