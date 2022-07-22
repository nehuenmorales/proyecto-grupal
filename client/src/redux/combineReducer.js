import { combineReducers } from 'redux';
import reducer from './Profiles/profiles-reducer';
import playerLoginReducer from './PlayerLogin/PlayerLoginReducer';
import GamesIncompleteReducer from "./GamesIncomplete/gamesIncompleteReducer"
import getFieldsR from './DetailField/DetailField-reducer';

export const reducers = combineReducers({
    reducer: reducer,
    playerLoginReducer: playerLoginReducer,
    GamesIncompleteReducer: GamesIncompleteReducer,
    getFieldsR: getFieldsR,

})

export default reducers;
 