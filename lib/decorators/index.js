"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Persistence_1 = require("../Persistence/Persistence");
function StatePersisted(databaseVersion) {
    if (databaseVersion === void 0) { databaseVersion = 0; }
    return function (target) {
        // Class returns proxied
        return new Proxy(target, {
            construct: function (target, args) {
                var storeInstance = new (target.bind.apply(target, __spreadArrays([void 0], args)))();
                // Current identifier by databaseVersion
                var identifier = Persistence_1.storageIdentifierGenerator(databaseVersion, target);
                // Try get persistedState by identifier, and use it for later state persistence setting
                var persistedState = localStorage.getItem(identifier);
                // Try delete previous deprecated persisted state
                if (!persistedState && databaseVersion > 0)
                    localStorage.removeItem(Persistence_1.storageIdentifierGenerator(databaseVersion - 1, target));
                // Keep local state obj reference to be used in setter-getter
                var stateRef = !!persistedState ? JSON.parse(persistedState) : storeInstance.state;
                // Define getter-setter for "state" property.
                // Getter just for getting state
                // Setter persists state
                Object.defineProperty(storeInstance, "state", {
                    get: function () {
                        return stateRef;
                    },
                    set: function (v) {
                        stateRef = v;
                        localStorage.setItem(identifier, JSON.stringify(v));
                    }
                });
                return storeInstance;
            },
        });
    };
}
exports.StatePersisted = StatePersisted;
//# sourceMappingURL=index.js.map