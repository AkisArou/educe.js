"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Managed(ctor) {
    Object.defineProperty(ctor, "_storeIdentifier", {
        value: Symbol(),
        writable: false
    });
}
exports.Managed = Managed;
//# sourceMappingURL=Managed.js.map