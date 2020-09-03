"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StatePersisted_1 = require("../decorators/StatePersisted");
var constants_1 = require("../Persistence/constants");
exports.storageIdentifierGenerator = function (dbVer, cls) {
    return constants_1.PersistenceConst.libName + cls.name + constants_1.PersistenceConst.dbVersion + dbVer;
};
// TODO: check for adding storage property: IDatabase, allowing setting custom database.
// The problem is getting-setting in db because of the non-asynchronous Proxy construct
// in Persisted decorator.
var Persistence = /** @class */ (function () {
    function Persistence() {
    }
    Persistence.clearStorePersistedState = function (dbVer, cls) {
        localStorage.removeItem(exports.storageIdentifierGenerator(dbVer, cls));
    };
    Persistence.createTransform = function (onGet, onSet) {
        return { onGet: onGet, onSet: onSet };
    };
    Persistence.Persisted = StatePersisted_1.StatePersisted;
    return Persistence;
}());
exports.Persistence = Persistence;
//# sourceMappingURL=Persistence.js.map