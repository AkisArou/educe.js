"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Store_1 = require("../Store/Store");
var ENTIRE_STORE_LISTENERS_1 = require("../Eventing/ENTIRE_STORE_LISTENERS");
function useStore(store, dynamicProps, withEffects, listen) {
    if (listen === void 0) { listen = true; }
    var actualStore = react_1.useState(function () { return typeof store === "function" ? Store_1.Store.getAddRef(store) : store; })[0];
    var _a = react_1.useState(function () { return actualStore.immutableState; }), data = _a[0], setState = _a[1];
    var memoizedUnsubscribableProps = react_1.useRef(new Set()).current;
    var handler = {
        get: function (target, prop) {
            if (listen && !memoizedUnsubscribableProps.has(prop) && !memoizedUnsubscribableProps.has(ENTIRE_STORE_LISTENERS_1.ENTIRE_STORE_LISTENERS)) {
                actualStore.subscribe(setState, prop);
                memoizedUnsubscribableProps.add(prop);
            }
            return data[prop];
        }
    };
    react_1.useEffect(function () {
        if (dynamicProps && listen) {
            actualStore.subscribe(setState, dynamicProps);
            if (Array.isArray(dynamicProps))
                dynamicProps.forEach(function (prop) { return memoizedUnsubscribableProps.add(prop); });
            else
                memoizedUnsubscribableProps.add(dynamicProps);
        }
        withEffects && actualStore.requestEffect();
        return function () {
            listen && actualStore.unsubscribe(setState, memoizedUnsubscribableProps);
            withEffects && actualStore.requestCleanup();
            if (typeof store === "function")
                Store_1.Store.removeRefDelete(store);
        };
    }, [withEffects, listen]);
    return typeof store === "function"
        ? [new Proxy(data, handler), actualStore]
        : new Proxy(data, handler);
}
exports.useStore = useStore;
//# sourceMappingURL=useStore.js.map