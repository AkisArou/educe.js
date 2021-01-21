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
Observable base class with history functionality.
Can be used independently.
Can be instantiated explicitly or implicitly by providing your class in useStore or withStore and being reference counted. Whenever no reference exists, your store will be destructed.
State subscriptions and unsubscriptions inside components happen implicitly by using js proxies.
Call setState for immutable state update.
You can also override requestEffects and requestCleanup as lifecycle methods.

#####  Stream
[AsyncIterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of "AsyncIterable") base class for single value observation.
Used independently or provided in useStream hook.
Subscriptions and unsubscriptions happen implicitly.

##### useStore
React binding [hook](https://reactjs.org/docs/hooks-intro.html "hook") for state access..
Provide the instance or the class of the store.
Returns the state.
Listens to any prop accessed by the returned state and only those.
You can explicitly provide the props to listen.
You can call requestEffects and requestCleanup as lifecycle methods by specifing the withEffects argument.
Can be used to access the state only one time by specifing the listen argument.

##### withStore
React HOC for state access. Same functionality as useStore but the hoc style.
TS: used only as decorator

##### useStream
React binding [hook](https://reactjs.org/docs/hooks-intro.html "hook") for state access. Also implicit subscription/unsubscription.


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

```
// ExampleStore.ts
import {Store} from "educe";

interfance IExampleStoreState {
    count: number;
}

class ExampleStore extends Store<IExampleStoreState> {
    protected state: IExampleStoreState = {
      count: 0  
    };
    
    requestEffect() {
        setTimeout(() => {
            this.setState({count: 10});
        }, 2000);
    }
    
    requestCleanup() {
        setTimeout(() => {
            this.setState({count: 0});
        }, 10000);
    }
    
    public increment = () => {
        this.setState({count: this.state.count + 1});
    }
    
    public decrement = () => {
        this.setState({count: this.state.count - 1});
    }
}

// Counter.tsx
import {useStore} from "educe";

const exampleStore = new ExampleStore();

const Counter = () => {
  const {count} = useStore(exampleStore); 
  // or const [{count}, exampleStore] = useStore(ExampleStore); for managed instance
  
  return (
    <div>
        <h5>The count is: {count}</h5>
        <button onClick={exampleStore.increment}>Increment</button>
        <button onClick={exampleStore.decrement}>Decrement</button>
    </div>
  );
};

```

# Basic Stream Example usage
```
// ExampleStream.ts

import {Stream} from "educe";

class ExampleStream extends Stream<boolean> {
    get initialData() {
        return false;
    }
    
    public toggle = () => {
        this.onDataChanged(true);
    }
}


// Light.tsx
import {useStream} from "educe";

const exampleStream = new ExampleStream();

const Light = () => {
  const {isOpen} = useStream(exampleStream); 
  
  return (
    <div>
     <h5>{isOpen ? "Open" : "Closed"}</h5>
     <button onClick={exampleStream.toggle}>Toggle</button>
    </div>
  );
};
```


# Future
- Will be used separately from React. useStore, useStream, withStore will be used as React bindings.
- Better documentation.
- Tests.
- Stable API.

### Installation

As of now, Educe.js requires [React.js](https://reactjs.org/) >=16.8.0+ to run. (The one with hooks)

```sh
$ npm install educe --save
```

License
----

MIT
