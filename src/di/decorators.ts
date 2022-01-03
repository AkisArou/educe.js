import {ContainerHolder} from "./ContainerHolder";
import {Lifetime} from "./Lifetime";
import {DefaultStoreConstructor, StoreConstructor} from "../types";
import {StoreEvent} from "../Store/types";

export function InjectableStore(lifetime: Lifetime) {
    return function <S extends object, E extends StoreEvent>(target: StoreConstructor<S, E>): void {
        ContainerHolder.instance.bind(target).withLifetime(lifetime);
    }
}

// export function InjectStore(klass: DefaultStoreConstructor) {
//     return function (target: any, propertyKey: string): void {
//         Object.defineProperty(target, propertyKey, {
//             get() {
//                 const instance = ContainerHolder.instance.get(klass);
//                 Object.defineProperty(this, propertyKey, {value: instance});
//                 return instance;
//             }
//         });
//     }
// }
