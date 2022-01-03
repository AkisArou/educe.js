import {Lifetime} from "./Lifetime";
import {StoreConstructor} from "../types";
import {StoreEvent} from "../Store/types";
import {Store} from "../Store/Store";

export interface IChildContainer {
    readonly type: Lifetime

    set<S extends object>(klass: StoreConstructor<S, StoreEvent>): void;

    get<S extends object>(klass: StoreConstructor<S, StoreEvent>): Store<S, StoreEvent>;

    has<S extends object>(klass: StoreConstructor<S, StoreEvent>): boolean;
}