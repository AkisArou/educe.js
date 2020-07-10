import {Store} from "../Store/Store";

type StoreCls<S extends object> = (new () => Store<S>);

export function StatePersisted<S extends object>(target: StoreCls<S>): StoreCls<S> {
    const identifier = "react-store|" + target.constructor.name;

    return new Proxy(target, {
        construct(target: any, args: any[]) {
            const ins = new target(...args);
            const persistedState = localStorage.getItem(identifier);

            if (!!persistedState)
                ins.state = JSON.parse(persistedState);

            return new Proxy(ins, {
                get(target: any, prop: string) {
                    return target[prop];
                },
                set(target: any, prop: string, value: object) {
                    prop === "state" && localStorage.setItem(identifier, JSON.stringify(value));
                    target[prop] = value;
                    return true;
                }
            });
        },
    });
}