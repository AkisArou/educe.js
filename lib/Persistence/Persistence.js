"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../decorators/index");
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
    Persistence.Persisted = index_1.StatePersisted;
    return Persistence;
}());
exports.Persistence = Persistence;
//# sourceMappingURL=Persistence.js.map