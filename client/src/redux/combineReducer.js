import {combineReducers } from 'redux';
import reducer from './Profiles/profiles-reducer'
import fieldsReducer from "./OwnerFields/fieldsReducer"
import gamesReducer from "./Games/gameReducer"
import suppliesReducer from "./OwnerSupplies/suppliesReducer"

export const reducers = combineReducers({
    reducer: reducer,
    fieldsReducer:fieldsReducer,
    gamesReducer: gamesReducer,


    suppliesReducer:suppliesReducer,
})

export default reducers;
 