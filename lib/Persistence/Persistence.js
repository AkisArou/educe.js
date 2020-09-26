"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StatePersisted_1 = require("../decorators/StatePersisted");
var constants_1 = require("../Persistence/constants");
exports.storageIdentifierGenerator = function (dbName, dbVer) {
    return constants_1.PersistenceConst.libName + dbName + constants_1.PersistenceConst.dbVersion + dbVer;
};
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
            database.removeItem(exports.storageIdentifierGenerator(dbName, dbVer));
        else if (Persistence.defaultDatabase)
            Persistence.defaultDatabase.removeItem(exports.storageIdentifierGenerator(dbName, dbVer));
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