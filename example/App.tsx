import React, {CSSProperties} from 'react';
import {ExampleStore} from "./stores/example-store/ExampleStore";
import {ExampleStoreEventType} from "./stores/example-store/ExampleStoreEvents";
import {useStore} from "./educe/hooks/useStore";

const style: CSSProperties = {
    background: "#ddd",
    flexDirection: "column",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    width: "100vw"
};


function App() {
    const [{count}, store] = useStore(ExampleStore);

    return (
        <div style={style}>
            <h1>Parent Count: {count}</h1>
            <button onClick={() => store.addEvent({type: ExampleStoreEventType.Add, valueToAdd: 10})}>Parent add
            </button>

            <Child/>
        </div>
    );
}

function Child() {
    const [{count}, store] = useStore(ExampleStore);
    return (
        <div>
            <h5>Child Count: {count}</h5>
            <button onClick={() => store.addEvent({type: ExampleStoreEventType.Deduct, valueToDeduct: 10})}>Child
                subtract
            </button>
        </div>
    )
}

export default App;
