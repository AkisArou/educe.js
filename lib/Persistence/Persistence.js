"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var decorators_1 = require("../decorators");
exports.storageIdentifierGenerator = function (dbVer, cls) {
    return "react-store|" + cls.name + "|db.v" + dbVer;
};
var Persistence = /** @class */ (function () {
    function Persistence() {
    }
    /* Helpers */
    Persistence.clearStorePersistedState = function (dbVer, cls) {
        localStorage.removeItem(exports.storageIdentifierGenerator(dbVer, cls));
    };
    Persistence.Persisted = decorators_1.StatePersisted;
    return Persistence;
}());
exports.Persistence = Persistence;
//# sourceMappingURL=Persistence.js.map