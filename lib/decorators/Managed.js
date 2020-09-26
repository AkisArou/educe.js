"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**@description
 * Decorator for Store subclasses.
 * Allows to be used in useStore, passed in as constructors and not instances.
 * */
function Managed(ctor) {
    Object.defineProperty(ctor, "_storeIdentifier", {
        value: Symbol(),
        writable: false
    });
}
exports.Managed = Managed;
//# sourceMappingURL=Managed.js.map