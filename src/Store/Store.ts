import Eventing from "../Eventing/Eventing";
import {History} from "../History/History";
import {ENTIRE_STATE} from "../Eventing/ENTIRE_STATE";

export abstract class Store<T extends object> {
    protected abstract state: T;

    protected constructor(needsHistory?: boolean) {
        if (needsHistory) this.history = new History<T>();
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
    public requestEffect(): void {}

    public requestCleanup(): void {}



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
    private onHistoryChangeCommit<K extends keyof T>(newState: T | Partial<T> | undefined): void {
        if (!newState) return;
        this.state = {...this.state, ...newState};

        for (let key of Object.keys(newState))
            this.eventing.trigger(key as K, this.state);
    }

    protected previousState<K extends keyof T>(prop: K | typeof ENTIRE_STATE = ENTIRE_STATE) {
        this.onHistoryChangeCommit(this.history?.previousState(prop));
    };

    protected nextState<K extends keyof T>(prop: K | typeof ENTIRE_STATE = ENTIRE_STATE) {
        this.onHistoryChangeCommit(this.history?.nextState(prop));
    }

    protected stateAt<K extends keyof T>(idx: number, prop: K | typeof ENTIRE_STATE = ENTIRE_STATE) {
        this.onHistoryChangeCommit(this.history?.stateAt(idx, prop));
    }

    protected clearStateHistory(): void {
        this.history?.clearStateHistory();
    }


    /**************
     * @statics
     * Dynamic store generation and removal by constructor arguments.
     *********** */

    private static stores: { [key: string]: { store: Store<any>; refs: number }; } = {};

    public static get<S extends Store<any>>(StoreConstructor: new (...args: any[]) => S): S {
        const storeFound = Store.stores[StoreConstructor.name] || {store: new StoreConstructor(), refs: 0};
        Store.stores[StoreConstructor.name] = storeFound;
        return storeFound.store as S;
    }

    public static getAddRef<S extends Store<any>>(StoreConstructor: new (...args: any[]) => S): S {
        const storeFound = Store.stores[StoreConstructor.name] || {store: new StoreConstructor(), refs: 0};
        storeFound.refs++;
        Store.stores[StoreConstructor.name] = storeFound;
        return storeFound.store as S;
    }

    public static removeRefDelete<S extends Store<any>>(StoreConstructor: new (...args: any[]) => S): void {
        const storeFound = Store.stores[StoreConstructor.name];
        storeFound.refs--;
        if (!storeFound.refs) delete Store.stores[StoreConstructor.name];
    }
}