import {IChildContainer} from "../IChildContainer";
import {Lifetime} from "../Lifetime";
import {DefaultStoreConstructor, DefaultStoreEvents, StoreConstructor} from "../../types";
import {Store} from "../../Store/Store";

export class SharedContainer implements IChildContainer {
    readonly type = Lifetime.SHARED;

    private readonly sharedClasses = new Set<DefaultStoreConstructor>();
    private readonly instances = new Map<DefaultStoreConstructor, Store<any, DefaultStoreEvents>>();
    private readonly refCounts = new Map<DefaultStoreConstructor, number>();

    public set<S extends object>(klass: StoreConstructor<S, DefaultStoreEvents>): void {
        this.sharedClasses.add(klass as unknown as DefaultStoreConstructor);

        if (this.refCounts.has(klass as unknown as DefaultStoreConstructor)) {
            throw new Error("Shared Store instance could not be set twice");
        }

        this.refCounts.set(klass as unknown as DefaultStoreConstructor, 0);
    }

    public get<S extends object>(klass: StoreConstructor<S, DefaultStoreEvents>): Store<S, DefaultStoreEvents> {
        const newRefCount = this.refCounts.get(klass as unknown as DefaultStoreConstructor)! + 1;
        this.refCounts.set(klass as unknown as DefaultStoreConstructor, newRefCount);

        if (this.instances.has(klass as unknown as DefaultStoreConstructor)) {
            return this.instances.get(klass as unknown as DefaultStoreConstructor)!;
        } else {
            const instance = new klass();
            this.instances.set(klass as unknown as DefaultStoreConstructor, instance);
            return instance;
        }
    }

    public unGet<S extends object>(klass: StoreConstructor<S, DefaultStoreEvents>) {
        const newRefCount = this.refCounts.get(klass as unknown as DefaultStoreConstructor)! - 1;
        this.refCounts.set(klass as unknown as DefaultStoreConstructor, newRefCount);

        if (newRefCount === 0) {
            this.instances.delete(klass as unknown as DefaultStoreConstructor);
        }
    }

    public has<S extends object>(klass: StoreConstructor<S, DefaultStoreEvents>): boolean {
        return this.sharedClasses.has(klass as unknown as DefaultStoreConstructor);
    }

}