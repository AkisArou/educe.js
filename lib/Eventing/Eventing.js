"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ENTIRE_STATE_1 = require("../Eventing/ENTIRE_STATE");
var Eventing = /** @class */ (function () {
    function Eventing() {
        var _this = this;
        this.stateSetters = {};
        this.subscribe = function (subProps, listener) {
            if (subProps instanceof Array)
                subProps.forEach(function (port) { return _this.subscribe(port, listener); });
            else {
                var portionListeners = _this.stateSetters[subProps] || new Set();
                portionListeners.add(listener);
                _this.stateSetters[subProps] = portionListeners;
            }
        };
        this.unsubscribe = function (unsubscribableProps, listener) {
            unsubscribableProps.forEach(function (prop) {
                if (prop instanceof Array)
                    prop.forEach(function (p) { return _this.stateSetters[p].delete(listener); });
                else
                    _this.stateSetters[prop].delete(listener);
            });
        };
        this.trigger = function (prop, data) {
            var _a, _b;
            (_a = _this.stateSetters[prop]) === null || _a === void 0 ? void 0 : _a.forEach(function (ln) { return ln(data); });
            (_b = _this.stateSetters[ENTIRE_STATE_1.ENTIRE_STATE]) === null || _b === void 0 ? void 0 : _b.forEach(function (ln) { return ln(data); });
        };
    }
    return Eventing;
}());
exports.default = Eventing;
//# sourceMappingURL=Eventing.js.map