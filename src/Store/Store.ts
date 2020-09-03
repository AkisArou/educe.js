import {ENTIRE_STATE} from "../constants/ENTIRE_STATE";
import Eventing from "../Eventing/Eventing";
import {History} from "../History/History";
import {StoreApproved, StoreConstructor, StoreStatic} from "../types";
import {Managed} from "../decorators/Managed";

interface HistoryConfig {
    readonly enableHistory: boolean;
    readonly historyLimit: number;
}


export abstract class Store<T extends object> {
    static readonly _storeIdentifier: unique symbol;

    /*** @decorator* */
    static readonly Managed = Managed;

    protected abstract state: T;

    constructor(historyConfig?: HistoryConfig) {
        if (historyConfig?.enableHistory)
            this.history = new History<T>(historyConfig.historyLimit);
    }

    /* Eventing props */
    private readonly eventing: Eventing<T> = new Eventing<T>();
    public readonly subscribe = this.eventing.subscribe;
    public readonly unsubscribe = this.eventing.unsubscribe;

    /* History props */
    private readonly history?: History<T>;
    private hasSavedFirstState = false;


    /* Just used for state privacy. Not really immutable.
       Not copied for no extra overhead. Maybe in the future becomes immutable
       Used in useStore and preferred only there. */
    public get immutableState(): T {
        return this.state;
    }


    /* Lifecycle methods */
    public requestEffect(): void {
    }

    public requestCleanup(): void {
    }


    /* State manipulation methods */
    /** @description Used for state property deletion in dynamic state properties.*/
    protected deletePropFromState(propName: keyof T): void {
        const newState = {...this.state};
        delete newState[propName];
        this.state = newState;
        this.history?.pushState(this.state);
        this.eventing.trigger(propName, this.state);
    }

    protected setState<K extends keyof T>(updateProps: Partial<T>): void {
        // Check for initial state save in history, because cannot access initial abstract state
        if (!!this.history && !this.hasSavedFirstState) {
            this.hasSavedFirstState = true;
            this.history.pushState(this.state);
        }

        this.state = {...this.state, ...updateProps};
        this.history?.pushState(this.state);

        for (let key of Object.keys(updateProps))
            this.eventing.trigger(key as K, this.state);
    }

    protected resetState<K extends keyof T>(initialState: T): void {
        this.state = initialState;
        if (!!this.history) {
            this.history!.clearStateHistory();
            this.hasSavedFirstState = false;
        }

        for (let key of Object.keys(initialState))
            this.eventing.trigger(key as K, this.state);
    }


    /* History methods */

    // returns if has history
    private onHistoryChangeCommit<K extends keyof T>(newState: T | Partial<T> | undefined): boolean {
        if (!newState) return false;
        this.state = {...this.state, ...newState};

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


    /**************
     * @statics
     * Dynamic store generation and removal by constructor arguments.
     *********** */

    private static stores: Map<symbol, { store: Store<any>; refs: number }> = new Map();

    public static get<S extends object, StoreClass extends new (...args: any[]) => Store<S>>(StoreConstructor: StoreApproved<S> | StoreClass | (new () => Store<S>)): InstanceType<StoreClass> {
        const storeFound = Store.stores.get((StoreConstructor as StoreStatic)._storeIdentifier) as { store: InstanceType<StoreClass>; refs: number } | undefined;
        if(!storeFound) throw new Error("Store used before its initialization. Check component hierarchy. Must be in boundaries of useStore which uses @Store.Manage decorator.");
        return storeFound.store;
    }

    public static getAddRef<S extends object>(StoreConstructor: StoreApproved<S>): Store<S> {
        const storeFound = Store.stores.get(StoreConstructor._storeIdentifier) ?? {
            store: new StoreConstructor(),
            refs: 0
        };
        storeFound.refs++;
        Store.stores.set(StoreConstructor._storeIdentifier, storeFound);
        return storeFound.store;
    }

    public static removeRefDelete<S extends object>(StoreConstructor: StoreApproved<S>): void {
        const storeFound = Store.stores.get(StoreConstructor._storeIdentifier)!;
        storeFound.refs--;
        if (!storeFound.refs) Store.stores.delete(StoreConstructor._storeIdentifier);
    }
}
