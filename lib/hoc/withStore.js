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
exports.withStore = void 0;
var react_1 = __importDefault(require("react"));
var useStore_1 = require("../hooks/useStore");
function withStore(store, storeProps) {
    if (storeProps === void 0) { storeProps = {}; }
    return function (WrappedComponent) {
        return function (props) {
            var _storeData = (0, useStore_1.useStore)(store, storeProps);
            return react_1.default.createElement(WrappedComponent, __assign({}, (props), { storeState: __assign(__assign({}, props.storeState), _storeData) }));
        };
    };
}
exports.withStore = withStore;
//# sourceMappingURL=withStore.js.map