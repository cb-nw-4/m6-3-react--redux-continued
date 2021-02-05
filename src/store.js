import { createStore } from "redux";

import reducer from './reducers:index.js';

export default function configureStore(initialState) {
    const store = createStore(
        reducer,
        initialState,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.
            __REDUX_DEVTOOLS_EXTENSION__()
    );
    return store;
}