import {combineReducers } from 'redux';
import reducer from './Profiles/profiles-reducer'
import fieldsReducer from "./OwnerFields/fieldsReducer"
import gamesReducer from "./Games/gameReducer"
import suppliesReducer from "./OwnerSupplies/suppliesReducer"
import playerLoginReducer from './PlayerLogin/PlayerLoginReducer';
import GamesIncompleteReducer from "./GamesIncomplete/gamesIncompleteReducer"
import getFieldsR from './DetailField/DetailField-reducer';
import games from './Games/gamesReducer'
import getPlayersReducer from './Players/GetPlayersReducer'
import complexReducer from './Complexes/ComplexReducer';

export const reducers = combineReducers({
    reducer: reducer,
    fieldsReducer:fieldsReducer,
    gamesReducer: gamesReducer,
    playerLoginReducer: playerLoginReducer,
    GamesIncompleteReducer: GamesIncompleteReducer,
    getFieldsR: getFieldsR,
    games: games,
    getPlayersReducer: getPlayersReducer,
    complexReducer: complexReducer,
    suppliesReducer:suppliesReducer,

    
})

export default reducers;
 