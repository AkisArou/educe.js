import {InjectableStore} from "../../educe/Container/decorators";
import {Store} from "../../educe/Store/Store";
import {unreachableEvent} from "../../educe/Store/unreachableEvent";
import {ExampleStoreEvents, ExampleStoreEventType} from "./ExampleStoreEvents";
import {ExampleStoreState} from "./ExampleStoreState";
import {Lifetime} from "../../educe/Container/Lifetime";

@InjectableStore(Lifetime.TRANSIENT)
export class ExampleStore extends Store<ExampleStoreState, ExampleStoreEvents> {
    protected state: ExampleStoreState = {
        count: 0,
        followers: []
    };

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
    }

    public hello() : string {
        return ""
    }
}




