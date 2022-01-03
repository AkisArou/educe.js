import {DefaultStoreEvents} from "../types";

export interface IStoreLifecycleObserver<S extends object, E extends DefaultStoreEvents> {
    onSetState?(state: S): void;
    onEventAdded?(event: E): void;
}