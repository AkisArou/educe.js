import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Store} from "../src";
import {StateDeepFreezer} from "../lib";


// Detect and throw for state mutations only in development
if (process.env.NODE_ENV === 'development')
    Store.addGlobalLifecycleObserver(new StateDeepFreezer())

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
