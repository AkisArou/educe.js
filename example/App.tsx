import React, {CSSProperties} from 'react';
import {useStore} from "../src";
import {ExampleStore} from "./example-store/ExampleStore";
import {ExampleStoreEventType} from "./example-store/ExampleStoreEvents";
import {Theme, themeStream} from "./example-stream/ThemeStream";
import {useStream} from "../src";

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
    const [{count}, store] = useStore(ExampleStore, {withEffects: true});

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
    const theme = useStream(themeStream)

    return (
        <div>
            <h5>Child Count: {count}</h5>
            <button onClick={() => store.addEvent({type: ExampleStoreEventType.Deduct, valueToDeduct: 10})}>Child
                subtract
            </button>

            <hr/>

            <h5>Theme: {theme === Theme.Dark ? "dark" : "light"}</h5>
            <button onClick={themeStream.toggleTheme}>Toggle theme</button>
        </div>
    )
}

export default App;
