import Eventing from "../Eventing/Eventing";

export abstract class Store<T extends object> {
    protected abstract state: T;
    private readonly eventing: Eventing<T> = new Eventing<T>();
    public readonly subscribe = this.eventing.subscribe;
    public readonly unsubscribe = this.eventing.unsubscribe;

    public get immutableState(): T {
        return this.state;
    }

    public requestEffect(): void {}

    public requestCleanup(): void {}

    /** @description Used for state property deletion in dynamic state properties.*/
    protected deletePropFromState(propName: keyof T): void {
        const newState = {...this.state};
        delete newState[propName];
        this.state = newState;
        this.eventing.trigger(propName, this.state);
    }

    protected setState<K extends keyof T>(updateProps: Partial<T>): void {
        this.state = {...this.state, ...updateProps};

        for (let key of Object.keys(updateProps))
            this.eventing.trigger(key as K, this.state);
    }

    protected resetState<K extends keyof T>(initialState: T): void {
        this.state = initialState;

        for (let key of Object.keys(initialState))
            this.eventing.trigger(key as K, this.state);
    }

    /** @statics Dynamic store generation and removal by constructor arguments.*/

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
        console.log({...Store.stores}, "Store.stores getAddRef");
        return storeFound.store as S;
    }

    public static removeRefDelete<S extends Store<any>>(StoreConstructor: new (...args: any[]) => S): void {
        const storeFound = Store.stores[StoreConstructor.name];
        console.log({...Store.stores}, {...storeFound}, "Store.stores removeRefDelete PRE --")
        storeFound.refs--;
        console.log({...Store.stores}, {...storeFound}, "Store.stores removeRefDelete POST --")
        if (!storeFound.refs) delete Store.stores[StoreConstructor.name];
        console.log(Store.stores, "Store.stores removeRefDelete DELETE")
    }
}
