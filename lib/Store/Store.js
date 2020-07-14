"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ENTIRE_STATE_1 = require("@Eventing/ENTIRE_STATE");
var Eventing_1 = __importDefault(require("@Eventing/Eventing"));
var History_1 = require("@History/History");
var Store = /** @class */ (function () {
    function Store(historyConfig) {
        /* Eventing props */
        this.eventing = new Eventing_1.default();
        this.subscribe = this.eventing.subscribe;
        this.unsubscribe = this.eventing.unsubscribe;
        this.hasSavedFirstState = false;
        if (historyConfig === null || historyConfig === void 0 ? void 0 : historyConfig.enableHistory)
            this.history = new History_1.History(historyConfig.historyLimit);
    }
    Object.defineProperty(Store.prototype, "immutableState", {
        /* Just used for state privacy. Not really immutable.
           Not copied for no extra overhead. Maybe in the future becomes immutable
           Used in useStore and preferred only there. */
        get: function () {
            return this.state;
        },
        enumerable: true,
        configurable: true
    });
    /* Lifecycle methods */
    Store.prototype.requestEffect = function () { };
    Store.prototype.requestCleanup = function () { };
    /* State manipulation methods */
    /** @description Used for state property deletion in dynamic state properties.*/
    Store.prototype.deletePropFromState = function (propName) {
        var _a;
        var newState = __assign({}, this.state);
        delete newState[propName];
        this.state = newState;
        (_a = this.history) === null || _a === void 0 ? void 0 : _a.pushState(this.state);
        this.eventing.trigger(propName, this.state);
    };
    Store.prototype.setState = function (updateProps) {
        var _a;
        // Check for initial state save in history, because cannot access initial abstract state
        if (!!this.history && !this.hasSavedFirstState) {
            this.hasSavedFirstState = true;
            this.history.pushState(this.state);
        }
        this.state = __assign(__assign({}, this.state), updateProps);
        (_a = this.history) === null || _a === void 0 ? void 0 : _a.pushState(this.state);
        for (var _i = 0, _b = Object.keys(updateProps); _i < _b.length; _i++) {
            var key = _b[_i];
            this.eventing.trigger(key, this.state);
        }
    };
    Store.prototype.resetState = function (initialState) {
        this.state = initialState;
        if (!!this.history) {
            this.history.clearStateHistory();
            this.hasSavedFirstState = false;
        }
        for (var _i = 0, _a = Object.keys(initialState); _i < _a.length; _i++) {
            var key = _a[_i];
            this.eventing.trigger(key, this.state);
        }
    };
    /* History methods */
    // returns if has history
    Store.prototype.onHistoryChangeCommit = function (newState) {
        if (!newState)
            return false;
        this.state = __assign(__assign({}, this.state), newState);
        for (var _i = 0, _a = Object.keys(newState); _i < _a.length; _i++) {
            var key = _a[_i];
            this.eventing.trigger(key, this.state);
        }
        return true;
    };
    Store.prototype.previousState = function (prop) {
        if (prop === void 0) { prop = ENTIRE_STATE_1.ENTIRE_STATE; }
        var _a;
        return this.onHistoryChangeCommit((_a = this.history) === null || _a === void 0 ? void 0 : _a.previousState(prop));
    };
    ;
    Store.prototype.nextState = function (prop) {
        if (prop === void 0) { prop = ENTIRE_STATE_1.ENTIRE_STATE; }
        var _a;
        return this.onHistoryChangeCommit((_a = this.history) === null || _a === void 0 ? void 0 : _a.nextState(prop));
    };
    Store.prototype.stateAt = function (idx, prop) {
        if (prop === void 0) { prop = ENTIRE_STATE_1.ENTIRE_STATE; }
        var _a;
        return this.onHistoryChangeCommit((_a = this.history) === null || _a === void 0 ? void 0 : _a.stateAt(idx, prop));
    };
    Store.prototype.queryPreviousState = function (fn) {
        var _a;
        return this.onHistoryChangeCommit((_a = this.history) === null || _a === void 0 ? void 0 : _a.query(fn));
    };
    Store.prototype.clearStateHistory = function () {
        var _a;
        (_a = this.history) === null || _a === void 0 ? void 0 : _a.clearStateHistory();
    };
    Store.get = function (StoreConstructor) {
        var storeFound = Store.stores[StoreConstructor.name] || { store: new StoreConstructor(), refs: 0 };
        Store.stores[StoreConstructor.name] = storeFound;
        return storeFound.store;
    };
    Store.getAddRef = function (StoreConstructor) {
        var storeFound = Store.stores[StoreConstructor.name] || { store: new StoreConstructor(), refs: 0 };
        storeFound.refs++;
        Store.stores[StoreConstructor.name] = storeFound;
        return storeFound.store;
    };
    Store.removeRefDelete = function (StoreConstructor) {
        var storeFound = Store.stores[StoreConstructor.name];
        storeFound.refs--;
        if (!storeFound.refs)
            delete Store.stores[StoreConstructor.name];
    };
    /**************
     * @statics
     * Dynamic store generation and removal by constructor arguments.
     *********** */
    Store.stores = {};
    return Store;
}());
exports.Store = Store;
//# sourceMappingURL=Store.js.map