"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const useStore_1 = require("../hooks/useStore");
const withStore = (store, dynamicProps, withEffects, listen = true) => {
    return (WrappedComponent) => {
        return (props) => {
            const _storeData = useStore_1.useStore((typeof store === "function" ? store() : store), dynamicProps, withEffects, listen);
            return react_1.default.createElement(WrappedComponent, Object.assign({}, (props), { storeData: _storeData }));
        };
    };
};
exports.withStore = withStore;
//# sourceMappingURL=withStore.js.map