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
var constants_1 = require("../Persistence/constants");
function StatePersisted(config) {
    return function (target) {
        // Class returns as proxied
        return new Proxy(target, {
            // StoreCls left any, for accessing .state property
            construct: function (StoreCls, args) {
                var _a;
                // Default initial database version = 0
                var databaseVersion = (_a = config === null || config === void 0 ? void 0 : config.databaseVersion) !== null && _a !== void 0 ? _a : 0;
                var transformer = config === null || config === void 0 ? void 0 : config.transformers;
                // Create instance
                var storeInstance = new (StoreCls.bind.apply(StoreCls, __spreadArrays([void 0], args)))();
                // Current identifier by databaseVersion
                var identifier = Persistence_1.storageIdentifierGenerator(databaseVersion, StoreCls);
                // Try get persistedState by identifier, and use it for later state persistence setting
                var persistedState = localStorage.getItem(identifier);
                // Try delete previous deprecated persisted state
                if (!persistedState && databaseVersion > 0)
                    localStorage.removeItem(Persistence_1.storageIdentifierGenerator(databaseVersion - 1, StoreCls));
                // Keep local state obj reference to be used in setter-getter
                var stateRef = !!persistedState
                    ? !!transformer ? transformer.onGet(JSON.parse(persistedState)) : JSON.parse(persistedState)
                    : storeInstance.state;
                // Define getter-setter for "state" property.
                // Getter: just for getting state
                // Setter: persists state
                Object.defineProperty(storeInstance, constants_1.PersistenceConst.statePropertyKey, {
                    get: function () {
                        return stateRef;
                    },
                    set: function (v) {
                        stateRef = v;
                        localStorage.setItem(identifier, !!transformer
                            ? JSON.stringify(transformer.onSet(v))
                            : JSON.stringify(v));
                    }
                });
                return storeInstance;
            },
        });
    };
}
exports.StatePersisted = StatePersisted;
//# sourceMappingURL=StatePersisted.js.map