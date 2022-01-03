# Educe.js


Educe is a simple at its interface, yet powerful state management solution for react, the OOP and react hooks way, built with TypeScript.
Uses the same API as React class based component, with the immutable pattern.
Its reason to exist is a boilerplate-free code with zero cost abstractions.

Consists of:
- Store - base class for your store and its history.
- Stream - base class for single value stream. (AsyncIterable)
- useStore - hook for state access.
- withStore - HOC/decorator for state access.
- useStream - hook for stream value access.
- Persistence - class with static methods as state persistence helpers.
- Store.Persisted - decorator for state persistence.

#####  Store
- Observable base class with history functionality.
- Manage its lifetime with decorators
- Can be used independently.
- State subscriptions inside components happen implicitly by using js proxies.
- You can also override requestEffects and requestCleanup as lifecycle methods.
- You can attach lifecycle observers by implementing the IStoreLifecycleObserver interface. (with addLifecycleObserver method) or add observers for all stores (with Store.addGlobalLifecycleObserver method)

#####  Stream
[AsyncIterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of "AsyncIterable") base class for single value observation.
Used independently or provided in useStream hook.
Subscriptions happen implicitly.

##### useStore
React binding [hook](https://reactjs.org/docs/hooks-intro.html "hook") for state access..
Provide the class of the store.
Returns the state.
Listens to any prop accessed by the returned state and only those.
You can explicitly provide the props to listen.
You can call requestEffects and requestCleanup as lifecycle methods by specifing the withEffects argument.
Can be used to access the state only one time by specifing the listen argument.

##### withStore
React HOC for state access. Same functionality as useStore but the hoc style.
TS: used only as decorator

##### useStream
React binding [hook](https://reactjs.org/docs/hooks-intro.html "hook") for state access. Also implicit subscription.


##### Persistence
Used as namespace for providing persistence utils.


##### Persistence.Persisted
 * Decorator/hof for Store subclasses.
 * Persists state on each setState call.
 * If provided database is synchronous, store gets instantiated with persisted state.
 * If database is asynchronous, store gets instantiated with initial state,
 * and when state is fetched, setState is internally called and updated.
 *
 * provide param StatePersistedConfig.
 * databaseName: is used concatenated for storage key
 * databaseVersion: versioning for the current Store. if version changes, old stored state is automatically, deleted.
 * Can delete manually from Persistence.clearStorePersistedState
 * database: default is localStorage, can set it here or can set default database from static Persistence.setDefaultDatabase
 * transformers: transforms state before its saving and after its fetch.
 * Use Persistence.createTransform, to pass function transformers for set and get database transactions.



# Basic Store Example usage
[Open in sandbox](https://codesandbox.io/s/silent-grass-wtmuj?file=/src/Count.tsx "Open in sandbox")

``` ts
// ExampleStoreState.ts
export interface ExampleStoreState {
    count: number;
    followers: string[]
}

// ExampleStoreEvents.ts
export enum ExampleStoreEventType {
    Add,
    Deduct
}

export type ExampleStoreEvents = StoreEvents<{
    CountAddEvent: { type: ExampleStoreEventType.Add, valueToAdd: number; }
    CountDeductEvent: { type: ExampleStoreEventType.Deduct, valueToDeduct: number; }
}>


// ExampleStore.ts
import {Store} from "educe";

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


// Counter.tsx
import {useStore} from "educe";

const exampleStore = new ExampleStore();

const Counter = () => {
  const {count} = useStore(exampleStore); 
  // or for managed instance
  // const [{count}, exampleStore] = useStore(ExampleStore);
  
  return (
    <div>
        <h5>The count is: {count}</h5>
        <button onClick={exampleStore.increment}>Increment</button>
        <button onClick={exampleStore.decrement}>Decrement</button>
    </div>
  );
};

```
Store state can be used outside react components
``` ts
const listener = (state: ExampleStoreState) => console.log(state.count);
exampleStore.subscribe("count", listener);
exampleStore.unsubscribe(new Set(["count"]), listener);
```

Prevent mutations of state when on development
```ts
// index.tsx

// Detect and throw for state mutations only in development
if (process.env.NODE_ENV === 'development')
    Store.addGlobalLifecycleObserver(new StateDeepFreezer())
```

# Basic Stream Example usage
``` ts
// ThemeStream.ts

import {Stream} from "educe";

export enum Theme {
    Light = "light",
    Dark = "dark"
}

export class ThemeStream extends Stream<Theme> {
    constructor() {
        super(true);
    }

    get initialValue(): Theme {
        return Theme.Dark
    }

    public toggleTheme = () => {
        this.nextValue(this.getValue() === Theme.Dark ? Theme.Light : Theme.Dark);
    }
}

export const themeStream = new ThemeStream();

// Theme.tsx
import {useStream} from "educe";


const Theme = () => {
  const theme = useStream(themeStream);
  
  return (
    <div>
        <h5>Theme: {theme === Theme.Dark ? "dark" : "light"}</h5>
        <button onClick={themeStream.toggleTheme}>Toggle theme</button>
    </div>
  );
};
```
Stream value can be used outside react components
``` ts
//With subscription
const listener = (isOpen: boolean) => console.log(isOpen);
exampleStream.subscribe(listener);
exampleStream.unsubscribe(listener);

// or as AsyncIterable
for await (const isOpen of exampleStream) {
    console.log(isOpen);
}
```



# Future
- Better documentation.
- Tests.

### Installation

As of now, Educe.js requires [React](https://reactjs.org/) >=16.8.0+ to run. (The one with hooks)

```npm
$ npm install educe --save
```

License
----

MIT
