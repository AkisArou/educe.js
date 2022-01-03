import {IChildContainer} from "../IChildContainer";
import {Lifetime} from "../Lifetime";
import {DefaultStoreConstructor, DefaultStoreEvents, StoreConstructor} from "../../types";
import {Store} from "../../Store/Store";
import {StoreEvent, StoreEvents} from "../../Store/types";

export class LazySingletonContainer implements IChildContainer {
    readonly type = Lifetime.LAZY_SINGLETON

    private readonly instances = new Map<DefaultStoreConstructor, Store<any, DefaultStoreEvents>>();
    private readonly lazySingletonClasses = new Set<DefaultStoreConstructor>();

    public set<S extends object, E extends DefaultStoreEvents>(klass: StoreConstructor<S, E>): void {
        this.lazySingletonClasses.add(klass as unknown as DefaultStoreConstructor);
    }

    public get<S extends object>(klass: StoreConstructor<S, DefaultStoreEvents>): Store<S, DefaultStoreEvents> {
        if (this.lazySingletonClasses.has(klass as unknown as DefaultStoreConstructor)) {
            const instance = new klass();
            this.instances.set(klass as unknown as DefaultStoreConstructor, instance);
            this.lazySingletonClasses.delete(klass as unknown as DefaultStoreConstructor);
            return instance;
        } else {
            return this.instances.get(klass as unknown as DefaultStoreConstructor)!;
        }
    }

    public has<S extends object>(klass: DefaultStoreConstructor<S>): boolean {
        return this.instances.has(klass as unknown as DefaultStoreConstructor) || this.lazySingletonClasses.has(klass as unknown as DefaultStoreConstructor);
    }
}