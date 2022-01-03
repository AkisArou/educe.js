"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Persistence = exports.storageIdentifierGenerator = void 0;
var StatePersisted_1 = require("./StatePersisted");
var constants_1 = require("./constants");
var storageIdentifierGenerator = function (dbName, dbVer) {
    return constants_1.PersistenceConst.libName + dbName + constants_1.PersistenceConst.dbVersion + dbVer;
};
exports.storageIdentifierGenerator = storageIdentifierGenerator;
var Persistence = /** @class */ (function () {
    function Persistence() {
    }
    Persistence.getDefaultDatabase = function () {
        return Persistence.defaultDatabase;
    };
    Persistence.setDefaultDatabase = function (database) {
        Persistence.defaultDatabase = database;
    };
    Persistence.clearStorePersistedState = function (dbName, dbVer, database) {
        if (database)
            database.removeItem((0, exports.storageIdentifierGenerator)(dbName, dbVer));
        else if (Persistence.defaultDatabase)
            Persistence.defaultDatabase.removeItem((0, exports.storageIdentifierGenerator)(dbName, dbVer));
    };
    Persistence.createTransform = function (onGet, onSet) {
        return { onGet: onGet, onSet: onSet };
    };
    /**Persistence decorator for Store subclasses*/
    Persistence.Persisted = StatePersisted_1.StatePersisted;
    return Persistence;
}());
exports.Persistence = Persistence;
//# sourceMappingURL=Persistence.js.map