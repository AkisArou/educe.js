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
var Eventing_1 = __importDefault(require("../Eventing/Eventing"));
var Store = /** @class */ (function () {
    function Store() {
        this.eventing = new Eventing_1.default();
        this.subscribe = this.eventing.subscribe;
        this.unsubscribe = this.eventing.unsubscribe;
    }
    Object.defineProperty(Store.prototype, "immutableState", {
        get: function () {
            return this.state;
        },
        enumerable: true,
        configurable: true
    });
    Store.prototype.requestEffect = function () { };
    Store.prototype.requestCleanup = function () { };
    /** @description Used for state property deletion in dynamic state properties.*/
    Store.prototype.deletePropFromState = function (propName) {
        var newState = __assign({}, this.state);
        delete newState[propName];
        this.state = newState;
        this.eventing.trigger(propName, this.state);
    };
    Store.prototype.setState = function (updateProps) {
        this.state = __assign(__assign({}, this.state), updateProps);
        for (var _i = 0, _a = Object.keys(updateProps); _i < _a.length; _i++) {
            var key = _a[_i];
            this.eventing.trigger(key, this.state);
        }
    };
    Store.prototype.resetState = function (initialState) {
        this.state = initialState;
        for (var _i = 0, _a = Object.keys(initialState); _i < _a.length; _i++) {
            var key = _a[_i];
            this.eventing.trigger(key, this.state);
        }
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
    /** @statics Dynamic store generation and removal by constructor arguments.*/
    Store.stores = {};
    return Store;
}());
exports.Store = Store;
//# sourceMappingURL=Store.js.map