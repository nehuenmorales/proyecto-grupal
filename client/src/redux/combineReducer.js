import { combineReducers } from 'redux';
import reducer from './Profiles/profiles-reducer';
import playerLoginReducer from './PlayerLogin/PlayerLoginReducer';
import GamesIncompleteReducer from "./GamesIncomplete/gamesIncompleteReducer"
import getFieldsR from './DetailField/DetailField-reducer';
import gamesReducer from './games/gamesReducer'

export const reducers = combineReducers({
    reducer: reducer,
    playerLoginReducer: playerLoginReducer,
    GamesIncompleteReducer: GamesIncompleteReducer,
    getFieldsR: getFieldsR,
    gamesReducer: gamesReducer,

})

export default reducers;
 