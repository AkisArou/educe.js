import {storageIdentifierGenerator} from "../Persistence/Persistence";
import {GenericStoreClass} from "../types";

export function StatePersisted(databaseVersion: number = 0) {
    return function <S extends object>(target: GenericStoreClass) {
        // Class returns as proxied
        return new Proxy(target, {
            construct(target: any, args: any[]) {
                const storeInstance = new target(...args);
                // Current identifier by databaseVersion
                const identifier = storageIdentifierGenerator(databaseVersion, target);
                // Try get persistedState by identifier, and use it for later state persistence setting
                const persistedState = localStorage.getItem(identifier);

                // Try delete previous deprecated persisted state
                if (!persistedState && databaseVersion > 0)
                    localStorage.removeItem(storageIdentifierGenerator(databaseVersion - 1, target));


                // Keep local state obj reference to be used in setter-getter
                let stateRef = !!persistedState ? JSON.parse(persistedState) : storeInstance.state;

                // Define getter-setter for "state" property.
                // Getter: just for getting state
                // Setter: persists state
                Object.defineProperty(storeInstance, "state", {
                    get() {
                        return stateRef;
                    },
                    set(v: any) {
                        stateRef = v;
                        localStorage.setItem(identifier, JSON.stringify(v));
                    }
                })

                return storeInstance;
            },
        });
    }
}
