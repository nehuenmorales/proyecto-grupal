import {combineReducers } from 'redux';
import reducer from './Profiles/profiles-reducer'
import GamesIncompleteReducer from "./GamesIncomplete/gamesIncompleteReducer"

export const reducers = combineReducers({
    reducer: reducer,
    
    GamesIncompleteReducer: GamesIncompleteReducer,
})

export default reducers;
 