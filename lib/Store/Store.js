"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Eventing_1 = __importDefault(require("../Eventing/Eventing"));
class Store {
    constructor() {
        this.eventing = new Eventing_1.default();
        this.subscribe = this.eventing.subscribe;
        this.unsubscribe = this.eventing.unsubscribe;
    }
    get immutableState() {
        return this.state;
    }
    requestEffect() { }
    requestCleanup() { }
    /** @description Used for state property deletion in dynamic state properties.*/
    deletePropFromState(propName) {
        const newState = Object.assign({}, this.state);
        delete newState[propName];
        this.state = newState;
        this.eventing.trigger(propName, this.state);
    }
    setState(updateProps) {
        this.state = Object.assign(Object.assign({}, this.state), updateProps);
        for (let key of Object.keys(updateProps))
            this.eventing.trigger(key, this.state);
    }
    resetState(initialState) {
        this.state = initialState;
        for (let key of Object.keys(initialState))
            this.eventing.trigger(key, this.state);
    }
    static get(StoreConstructor) {
        const storeFound = Store.stores[StoreConstructor.name] || { store: new StoreConstructor(), refs: 0 };
        Store.stores[StoreConstructor.name] = storeFound;
        return storeFound.store;
    }
    static getAddRef(StoreConstructor) {
        const storeFound = Store.stores[StoreConstructor.name] || { store: new StoreConstructor(), refs: 0 };
        storeFound.refs++;
        Store.stores[StoreConstructor.name] = storeFound;
        return storeFound.store;
    }
    static removeRefDelete(StoreConstructor) {
        const storeFound = Store.stores[StoreConstructor.name];
        storeFound.refs--;
        if (!storeFound.refs)
            delete Store.stores[StoreConstructor.name];
    }
}
exports.Store = Store;
/** @statics Dynamic store generation and removal by constructor arguments.*/
Store.stores = {};
//# sourceMappingURL=Store.js.map