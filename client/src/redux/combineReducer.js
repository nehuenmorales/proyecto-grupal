import {combineReducers } from 'redux';
import reducer from './Profiles/profiles-reducer'
import fieldsReducer from "./OwnerFields/fieldsReducer"
import suppliesReducer from "./OwnerSupplies/suppliesReducer"

export const reducers = combineReducers({
    reducer: reducer,
    fieldsReducer:fieldsReducer,


    suppliesReducer:suppliesReducer,
})

export default reducers;
 