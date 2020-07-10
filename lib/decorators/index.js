"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function StatePersisted(target) {
    const identifier = "react-store|" + target.name;
    return new Proxy(target, {
        construct(target, args) {
            const ins = new target(...args);
            const persistedState = localStorage.getItem(identifier);
            if (!!persistedState)
                ins.state = JSON.parse(persistedState);
            return new Proxy(ins, {
                get(target, prop) {
                    return target[prop];
                },
                set(target, prop, value) {
                    prop === "state" && localStorage.setItem(identifier, JSON.stringify(value));
                    target[prop] = value;
                    return true;
                }
            });
        },
    });
}
exports.StatePersisted = StatePersisted;
//# sourceMappingURL=index.js.map