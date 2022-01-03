import {InjectableStore} from "../../src";
import {Lifetime} from "../../src";
import {Store} from "../../src"
import {ExampleStoreState} from "./ExampleStoreState";
import {ExampleStoreEvents, ExampleStoreEventType} from "./ExampleStoreEvents";
import {unreachableEvent} from "../../src";

@InjectableStore(Lifetime.TRANSIENT)
export class ExampleStore extends Store<ExampleStoreState, ExampleStoreEvents> {
    protected state: ExampleStoreState = {
        count: 0,
        followers: []
    };

    public requestEffect() {
        console.log("fetching something...");
    }

    public requestCleanup() {
        console.log("close some websockets...");
    }

    public mapEventToState(event: ExampleStoreEvents): void {
        switch (event.type) {
            case ExampleStoreEventType.Add:
                this.setState({count: this.state.count + event.valueToAdd})
                break;
            case ExampleStoreEventType.Deduct:
                this.setState({count: this.state.count - event.valueToDeduct});
                break;
            default:
                unreachableEvent(event);
        }

        // The code bellow throws when Store.addGlobalLifecycleObserver(new StateDeepFreezer())
        // this.state.followers.push("new follower")
    }

    public somePublicMethod(): void {
        console.log("does something...");
    }
}




