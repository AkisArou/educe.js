"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// For now unlimited state saving... Check for setting up a LIMIT.
var History = /** @class */ (function () {
    function History(historyLimit) {
        this.historyLimit = historyLimit;
        this.states = [];
        this.currentIdx = 0;
    }
    History.prototype.query = function (fn) {
        for (var _i = 0, _a = this.states; _i < _a.length; _i++) {
            var state = _a[_i];
            if (fn(state))
                return state;
        }
    };
    History.prototype.previousState = function (prop) {
        if (!this.states[this.currentIdx - 1])
            return;
        this.currentIdx -= 1;
        return this.getValue(prop);
    };
    History.prototype.nextState = function (prop) {
        if (!this.states[this.currentIdx + 1])
            return;
        this.currentIdx += 1;
        return this.getValue(prop);
    };
    History.prototype.stateAt = function (idx, prop) {
        if (!this.states[idx])
            return;
        this.currentIdx = idx;
        return this.getValue(prop);
    };
    History.prototype.getValue = function (prop) {
        var _a;
        return typeof prop === "string"
            ? (_a = {}, _a[prop] = this.states[this.currentIdx][prop], _a)
            : this.states[this.currentIdx];
    };
    History.prototype.pushState = function (state) {
        if (this.states.length >= this.historyLimit)
            this.states.shift();
        this.states.push(state);
        this.currentIdx = this.states.length - 1;
    };
    History.prototype.clearStateHistory = function () {
        this.states.length = 0;
        this.currentIdx = 0;
    };
    return History;
}());
exports.History = History;
//# sourceMappingURL=History.js.map