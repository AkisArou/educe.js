import {ENTIRE_STATE} from "../constants/ENTIRE_STATE";
import Eventing from "../Eventing/Eventing";
import {History} from "../History/History";
import {HistoryConfig} from "./types";
import {IStoreLifecycleObserver,} from "./IStoreLifecycleObserver";
import {DefaultStoreEvents} from "../types";


export abstract class Store<T extends object, E extends DefaultStoreEvents> {
    // Lifecycle observers
    private static globalLifecycleObservers: IStoreLifecycleObserver<object, DefaultStoreEvents>[] = [];

    public static addGlobalLifecycleObserver(lifecycleObserver: IStoreLifecycleObserver<object, DefaultStoreEvents>): void {
        Store.globalLifecycleObservers.push(lifecycleObserver);
    }

    private lifecycleObserver?: IStoreLifecycleObserver<T, E>;

    protected addLifecycleObserver(lifecycleObserver: IStoreLifecycleObserver<T, E>): void {
        this.lifecycleObserver = lifecycleObserver;
    }

    protected enableHistory(historyConfig: HistoryConfig): void {
        this.history = new History<T>(historyConfig.historyLimit);
    }


    /* State */
    protected abstract state: T;

    private setNextState(state: T) {
        this.state = state;
        Store.globalLifecycleObservers.forEach(o => o.onSetState?.(state));
        this.lifecycleObserver?.onSetState?.(state);
    }

    /* Eventing props */
    private readonly eventing: Eventing<T> = new Eventing<T>();
    public readonly subscribe = this.eventing.subscribe;
    public readonly unsubscribe = this.eventing.unsubscribe;

    /* History props */
    private history?: History<T>;
    private hasSavedFirstState = false;


    /* Exposed state for hooks usage */
    public get _state(): T {
        return this.state;
    }


    /* UI triggered Lifecycle methods */
    public requestEffect(): void {
    }

    public requestCleanup(): void {
    }


    /* State manipulation methods */
    /** @description Used for state property deletion in dynamic state properties.*/
    protected deletePropFromState(propName: keyof T): void {
        const newState = {...this.state};
        delete newState[propName];
        this.setNextState(newState);
        this.history?.pushState(this.state);
        this.eventing.trigger(propName, this.state);
    }

    protected setState<K extends keyof T>(updateProps: Partial<T>): void {
        // Check for initial state save in history, because cannot access initial abstract state
        if (!!this.history && !this.hasSavedFirstState) {
            this.hasSavedFirstState = true;
            this.history.pushState(this.state);
        }

        this.setNextState({...this.state, ...updateProps});
        this.history?.pushState(this.state);

        for (let key of Object.keys(updateProps))
            this.eventing.trigger(key as K, this.state);
    }

    protected resetState<K extends keyof T>(initialState: T): void {
        this.setNextState(initialState);
        if (!!this.history) {
            this.history!.clearStateHistory();
            this.hasSavedFirstState = false;
        }

        for (let key of Object.keys(initialState))
            this.eventing.trigger(key as K, this.state);
    }

    protected abstract mapEventToState(event: E): void;

    public addEvent(event: E) {
        this.lifecycleObserver?.onEventAdded?.(event);
        Store.globalLifecycleObservers.forEach(o => o.onEventAdded?.(event));
        this.mapEventToState(event);
    }


    /* History methods */

    /**
     * @return If has history
     */
    private onHistoryChangeCommit<K extends keyof T>(newState: T | Partial<T> | undefined): boolean {
        if (!newState) return false;
        this.setNextState({...this.state, ...newState});

        for (let key of Object.keys(newState))
            this.eventing.trigger(key as K, this.state);

        return true;
    }

    protected previousState<K extends keyof T>(prop: K | typeof ENTIRE_STATE = ENTIRE_STATE): boolean {
        return this.onHistoryChangeCommit(this.history?.previousState(prop));
    };

    protected nextState<K extends keyof T>(prop: K | typeof ENTIRE_STATE = ENTIRE_STATE): boolean {
        return this.onHistoryChangeCommit(this.history?.nextState(prop));
    }

    protected stateAt<K extends keyof T>(idx: number, prop: K | typeof ENTIRE_STATE = ENTIRE_STATE): boolean {
        return this.onHistoryChangeCommit(this.history?.stateAt(idx, prop));
    }

    protected queryPreviousState(fn: (state: T) => boolean): boolean {
        return this.onHistoryChangeCommit(this.history?.query(fn));
    }

    protected clearStateHistory(): void {
        this.history?.clearStateHistory();
    }
}
