import {IStoreLifecycleObserver} from "./IStoreLifecycleObserver";
import {deepFreeze} from "./util";
import {DefaultStoreEvents} from "../types";

export class StateDeepFreezer implements IStoreLifecycleObserver<object, DefaultStoreEvents> {
    public onSetState(state:object) {
        deepFreeze(state)
    }
}
