import {combineReducers } from 'redux';
import reducer from './Profiles/profiles-reducer'
import fieldsReducer from "./OwnerFields/fieldsReducer"
import gamesReducer from "./Games/gameReducer"

export const reducers = combineReducers({
    reducer: reducer,
    fieldsReducer:fieldsReducer,
    gamesReducer: gamesReducer,
})

export default reducers;
 