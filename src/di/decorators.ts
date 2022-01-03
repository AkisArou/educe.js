import {ContainerHolder} from "./ContainerHolder";
import {Lifetime} from "./Lifetime";
import {StoreConstructor} from "../types";
import {StoreEvent} from "../Store/types";

export function InjectableStore(lifetime: Lifetime) {
    return function <S extends object, E extends StoreEvent>(target: StoreConstructor<S, E>): void {
        ContainerHolder.instance.bind(target).withLifetime(lifetime);
    }
}