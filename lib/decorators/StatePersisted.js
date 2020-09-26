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
/**@description
 * Decorator for Store subclasses.
 * Persists state on each setState call.
 * If provided database is synchronous, store gets instantiated with persisted state.
 * If database is asynchronous, store gets instantiated with initial state,
 * and when state is fetched, setState is internally called and updated.
 *
 * @param config {StatePersistedConfig}
 * databaseName: is used concatenated for storage key
 * databaseVersion: versioning for the current Store. if version changes, old stored state is automatically, deleted.
 * Can delete manually from Persistence.clearStorePersistedState
 * database: default is localStorage, can set it here or can set default database from static Persistence.setDefaultDatabase
 * transformers: transforms state before its saving and after its fetch.
 * Use Persistence.createTransform, to pass function transformers for set and get database transactions.
 * */
function StatePersisted(config) {
    return function (target) {
        // Class returns as proxied
        return new Proxy(target, {
            // StoreCls left any, for accessing .state property
            construct: function (StoreCls, args) {
                var _a, _b, _c;
                // Get database to work with
                var database = (_b = (_a = config.database) !== null && _a !== void 0 ? _a : Persistence_1.Persistence.getDefaultDatabase()) !== null && _b !== void 0 ? _b : localStorage;
                // Default initial database version = 0
                var databaseVersion = (_c = config === null || config === void 0 ? void 0 : config.databaseVersion) !== null && _c !== void 0 ? _c : 0;
                var transformer = config === null || config === void 0 ? void 0 : config.transformers;
                // Create instance
                var storeInstance = new (StoreCls.bind.apply(StoreCls, __spreadArrays([void 0], args)))();
                // Current identifier by databaseVersion
                var identifier = Persistence_1.storageIdentifierGenerator(config.databaseName, databaseVersion);
                // Try get persistedState by identifier, and use it for later state persistence setting
                var persistedState = database.getItem(identifier);
                // Try delete previous deprecated persisted state
                if (!persistedState && databaseVersion > 0)
                    database.removeItem(Persistence_1.storageIdentifierGenerator(config.databaseName, databaseVersion - 1));
                function parsePersistedState(stringifiedState) {
                    return !!transformer
                        ? transformer.onGet(JSON.parse(stringifiedState))
                        : JSON.parse(stringifiedState);
                }
                function stringifyStateToPersist(state) {
                    return !!transformer
                        ? JSON.stringify(transformer.onSet(state))
                        : JSON.stringify(state);
                }
                // State assignment depends on persistedState and if database is async
                var stateRef;
                if (persistedState instanceof Promise) {
                    stateRef = storeInstance.state;
                    persistedState
                        .then(function (state) { return !!state && storeInstance.setState(parsePersistedState(state)); })
                        .catch(console.error);
                }
                else {
                    stateRef = !!persistedState
                        ? parsePersistedState(persistedState)
                        : storeInstance.state;
                }
                // Define getter-setter for "state" property.
                // Getter: just for getting state
                // Setter: persists and reassigns state
                Object.defineProperty(storeInstance, constants_1.PersistenceConst.statePropertyKey, {
                    get: function () {
                        return stateRef;
                    },
                    set: function (v) {
                        stateRef = v;
                        database.setItem(identifier, stringifyStateToPersist(v));
                    }
                });
                return storeInstance;
            },
        });
    };
}
exports.StatePersisted = StatePersisted;
//# sourceMappingURL=StatePersisted.js.map