import { combineReducers } from 'redux';
import reducer from './Profiles/profiles-reducer';
import playerLoginReducer from './PlayerLogin/PlayerLoginReducer';
import GamesIncompleteReducer from "./GamesIncomplete/gamesIncompleteReducer"

export const reducers = combineReducers({
    reducer: reducer,
    playerLoginReducer: playerLoginReducer,
    GamesIncompleteReducer: GamesIncompleteReducer,
})

export default reducers;
 