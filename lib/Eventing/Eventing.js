"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ENTIRE_STORE_LISTENERS_1 = require("./ENTIRE_STORE_LISTENERS");
class Eventing {
    constructor() {
        this.stateSetters = {};
        this.subscribe = (listener, subProps) => {
            if (subProps instanceof Array)
                subProps.forEach(port => this.subscribe(listener, port));
            else {
                const portionListeners = this.stateSetters[subProps] || new Set();
                portionListeners.add(listener);
                this.stateSetters[subProps] = portionListeners;
            }
        };
        this.unsubscribe = (listener, unsubscribableProps) => {
            unsubscribableProps.forEach(prop => {
                if (prop instanceof Array)
                    prop.forEach(p => this.stateSetters[p].delete(listener));
                else
                    this.stateSetters[prop].delete(listener);
            });
        };
        this.trigger = (prop, data) => {
            var _a, _b;
            (_a = this.stateSetters[prop]) === null || _a === void 0 ? void 0 : _a.forEach(ln => ln(data));
            (_b = this.stateSetters[ENTIRE_STORE_LISTENERS_1.ENTIRE_STORE_LISTENERS]) === null || _b === void 0 ? void 0 : _b.forEach(ln => ln(data));
        };
    }
}
exports.default = Eventing;
//# sourceMappingURL=Eventing.js.map