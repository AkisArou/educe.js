import {IChildContainer} from "../IChildContainer";
import {Lifetime} from "../Lifetime";
import {DefaultStoreConstructor, DefaultStoreEvents, StoreConstructor} from "../../types";
import {StoreEvent} from "../../Store/types";
import {Store} from "../../Store/Store";

export class PerRequestContainer implements IChildContainer {
    readonly type = Lifetime.TRANSIENT;

    private readonly perRequestClasses = new Set<DefaultStoreConstructor>();

    public set<S extends object>(klass: StoreConstructor<S, DefaultStoreEvents>): void {
        this.perRequestClasses.add(klass as unknown as DefaultStoreConstructor);
    }

    public get<S extends object>(klass: StoreConstructor<S, DefaultStoreEvents>): Store<S, DefaultStoreEvents> {
        return new klass();
    }

    public has<S extends object>(klass: StoreConstructor<S, DefaultStoreEvents>): boolean {
        return this.perRequestClasses.has(klass as unknown as DefaultStoreConstructor);
    }
}