import {Store} from "./Store";
import {StoreEvent} from "./types";
import {StoreConfiguration} from "./StoreConfiguration";

function deepFreeze(object: any) {
    const propNames = Object.getOwnPropertyNames(object);

    for (const name of propNames) {
        const value = object[name];

        if (value && typeof value === "object") {
            if (value instanceof Map || value instanceof WeakMap) {
                value.set = function (key) {
                    throw(`Can't add property ${key}, Map is not extensible`);
                };

                value.delete = function (key) {
                    throw(`Can't delete property ${key}, Map is frozen`);
                };

                if (value instanceof Map)
                    value.clear = function () {
                        throw(`Can't clear map, Map is frozen`);
                    };
            } else if (value instanceof Set || value instanceof WeakSet) {
                value.add = function () {
                    throw(`Can't add property, Set is not extensible`);
                }

                value.delete = function () {
                    throw(`Can't delete property, Set is frozen`);
                }

                if (value instanceof Set)
                    value.clear = function () {
                        throw(`Can't clear set, Set is frozen`);
                    }

            }

            deepFreeze(value);
        }
    }

    return Object.freeze(object);
}

/**
 * State Decorator
 */
export function Immutable<T extends object, E extends StoreEvent>(target: Store<T, E>, prop: string): void {
    if (!StoreConfiguration.getIsStrictStateImmutabilityCheckEnabled()) return;

    let isConfigured = false
    let stateRef: T;

    Object.defineProperty(target, prop, {
        configurable: false,
        get() {
            return stateRef;
        },
        set(state: T) {
            stateRef = state

            if (!isConfigured) {
                deepFreeze(stateRef)
                isConfigured = true
            }
        }
    })
}
