import { createStore, applyMiddleware, compose } from "redux";
import rootReducers from "./combineReducer";
import thunk from "redux-thunk";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;

const store = createStore(rootReducers, composeEnhancer(applyMiddleware(thunk)));

export default store;
