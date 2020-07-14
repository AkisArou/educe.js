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
var react_1 = __importDefault(require("react"));
var useStore_1 = require("@hooks/useStore");
var withStore = function (store, dynamicProps, withEffects, listen) {
    if (listen === void 0) { listen = true; }
    return function (WrappedComponent) {
        return function (props) {
            var _storeData = useStore_1.useStore((typeof store === "function" ? store() : store), dynamicProps, withEffects, listen);
            return react_1.default.createElement(WrappedComponent, __assign({}, (props), { storeData: _storeData }));
        };
    };
};
exports.withStore = withStore;
//# sourceMappingURL=withStore.js.map