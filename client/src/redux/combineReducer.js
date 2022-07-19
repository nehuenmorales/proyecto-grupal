import {combineReducers } from 'redux';
import reducer from './Profiles/profiles-reducer'
import fieldsReducer from "./OwnerFields/fieldsReducer"

export const reducers = combineReducers({
    reducer: reducer,
    fieldsReducer:fieldsReducer,
})

export default reducers;
 