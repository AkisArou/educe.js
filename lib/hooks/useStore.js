"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const Store_1 = require("../Store/Store");
const ENTIRE_STORE_LISTENERS_1 = require("../Eventing/ENTIRE_STORE_LISTENERS");
function useStore(store, dynamicProps, withEffects, listen = true) {
    const [actualStore] = react_1.useState(() => typeof store === "function" ? Store_1.Store.getAddRef(store) : store);
    const [data, setState] = react_1.useState(() => actualStore.immutableState);
    const { current: memoizedUnsubscribableProps } = react_1.useRef(new Set());
    const handler = {
        get(target, prop) {
            if (listen && !memoizedUnsubscribableProps.has(prop) && !memoizedUnsubscribableProps.has(ENTIRE_STORE_LISTENERS_1.ENTIRE_STORE_LISTENERS)) {
                actualStore.subscribe(setState, prop);
                memoizedUnsubscribableProps.add(prop);
            }
            return data[prop];
        }
    };
    react_1.useEffect(() => {
        if (dynamicProps && listen) {
            actualStore.subscribe(setState, dynamicProps);
            if (Array.isArray(dynamicProps))
                dynamicProps.forEach(prop => memoizedUnsubscribableProps.add(prop));
            else
                memoizedUnsubscribableProps.add(dynamicProps);
        }
        withEffects && actualStore.requestEffect();
        return () => {
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