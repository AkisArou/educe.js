"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
function StatePersisted(target) {
    var identifier = "react-store|" + target.name;
    return new Proxy(target, {
        construct: function (target, args) {
            var ins = new (target.bind.apply(target, __spreadArrays([void 0], args)))();
            var persistedState = localStorage.getItem(identifier);
            if (!!persistedState)
                ins.state = JSON.parse(persistedState);
            return new Proxy(ins, {
                get: function (target, prop) {
                    return target[prop];
                },
                set: function (target, prop, value) {
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