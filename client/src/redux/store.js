import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from '../reducers'
import thunk from 'redux-thunk'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose; 

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

export default store;