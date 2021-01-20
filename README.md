# Educe.js


React-store is a simple at its interface, yet powerful state management solution for react, the OOP and react hooks way, built with TypeScript.
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

# Basic Store Example usage

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
    
    public increment() {
        this.setState({count: this.state.count + 1});
    }
    
    public decrement() {
        this.setState({count: this.state.count - 1});
    }
}

// Counter.tsx
import {useStore} from "educe";

const exampleStore = new ExampleStore();

const Counter = () => {
  const {count} = useStore(exampleStore); 

  return <h5>The count is: {count}</h5>
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
    
    public toggle() {
        this.onDataChanged(true);
    }
}


// Light.tsx
import {useStream} from "educe";

const exampleStream = new ExampleStream();

const Light = () => {
  const {isOpen} = useStream(exampleStream); 

  return <h5>{isOpen ? "Open" : "Closed"}</h5>
};
```


# Future
- Will be used seperately from React. useStore, useStream, withStore will be used as React bindings.
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

