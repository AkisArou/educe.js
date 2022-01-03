"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStore = void 0;
var ENTIRE_STATE_1 = require("../constants/ENTIRE_STATE");
var react_1 = require("react");
var ContainerHolder_1 = require("../di/ContainerHolder");
var Lifetime_1 = require("../di/Lifetime");
function useStore(storeClass, _a) {
    var _b = _a === void 0 ? {} : _a, dynamicProps = _b.dynamicProps, _c = _b.withEffects, withEffects = _c === void 0 ? false : _c, _d = _b.listen, listen = _d === void 0 ? true : _d;
    var store = (0, react_1.useState)(function () { return ContainerHolder_1.ContainerHolder.instance.get(storeClass); })[0];
    var _e = (0, react_1.useState)(function () { return store._state; }), state = _e[0], setState = _e[1];
    var memoizedUnsubscribableProps = (0, react_1.useRef)(new Set()).current;
    var handler = {
        get: function (target, prop) {
            if (listen && !memoizedUnsubscribableProps.has(prop) && !memoizedUnsubscribableProps.has(ENTIRE_STATE_1.ENTIRE_STATE)) {
                store.subscribe(prop, setState);
                memoizedUnsubscribableProps.add(prop);
            }
            return state[prop];
        }
    };
    (0, react_1.useEffect)(function () {
        if (!!dynamicProps && listen) {
            store.subscribe(dynamicProps, setState);
            if (Array.isArray(dynamicProps))
                dynamicProps.forEach(function (prop) { return memoizedUnsubscribableProps.add(prop); });
            else
                memoizedUnsubscribableProps.add(dynamicProps);
        }
        if (withEffects)
            store.requestEffect();
        return function () {
            if (listen)
                store.unsubscribe(memoizedUnsubscribableProps, setState);
            if (withEffects)
                store.requestCleanup();
            var container = ContainerHolder_1.ContainerHolder.instance.getContainerByBoundClass(storeClass);
            if (container.type === Lifetime_1.Lifetime.SHARED)
                container.unGet(storeClass);
        };
    }, [withEffects, listen]);
    return [new Proxy(state, handler), store];
}
exports.useStore = useStore;
//# sourceMappingURL=useStore.js.map