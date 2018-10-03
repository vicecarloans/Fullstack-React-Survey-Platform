import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import reduxThunk from 'redux-thunk'
import App from './components/App'
import axios from 'axios'

import reducers from './reducers'
window.axios = axios
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
    applyMiddleware(reduxThunk)
)

const store = createStore(reducers, /*preloadedState, */ enhancer)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , 
    document.getElementById('root')
);