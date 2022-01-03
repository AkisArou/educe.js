import {IChildContainer} from "../IChildContainer";
import {Lifetime} from "../Lifetime";
import {DefaultStoreConstructor, DefaultStoreEvents, StoreConstructor} from "../../types";
import {Store} from "../../Store/Store";

export class SingletonContainer implements IChildContainer {
    readonly type = Lifetime.SINGLETON

    private instances = new Map<DefaultStoreConstructor, Store<any, DefaultStoreEvents>>();

    public set<S extends object>(klass: StoreConstructor<S, DefaultStoreEvents>): void {
        this.instances.set(klass as unknown as DefaultStoreConstructor, new klass());
    }

    public get<S extends object>(klass: StoreConstructor<S, DefaultStoreEvents>): Store<S, DefaultStoreEvents> {
        return this.instances.get(klass as unknown as DefaultStoreConstructor)!;
    }

    public has<S extends object>(klass: StoreConstructor<S, DefaultStoreEvents>): boolean {
        return this.instances.has(klass as unknown as DefaultStoreConstructor);
    }
}