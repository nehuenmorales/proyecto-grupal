import {combineReducers } from 'redux';
import fieldsReducer from "./OwnerFields/fieldsReducer";
import suppliesReducer from "./OwnerSupplies/suppliesReducer"
import GamesIncompleteReducer from "./GamesIncomplete/gamesIncompleteReducer"
import getFieldsR from './DetailField/DetailField-reducer';
import games from './Games/gamesReducer'
import getPlayersReducer from './Players/GetPlayersReducer'
import complexReducer from './Complexes/ComplexReducer';
import getOwnerReducer from './GetOwner/getOwnerReducer';
import complexReducerOwner from './OwnerComplex/complexReducer';
import complexDetailReducer from './OwnerComplex/ComplexDetailOwner/ComplexDetailReducer';
import modifyComplexReducer from './OwnerComplex/ModifyComplex/modifyComplexReducer'
import paymentsReducer from './Payments/paymentsReducer';
import getTournamentReducer from './Tournament/tournamentReducer';
import teamsReducer from './Teams/teamsReducer'
import fieldDetailReducer from "./OwnerFields/FieldDetailOwner/FieldDetailReducer"

export const reducers = combineReducers({
    modifyComplexReducer: modifyComplexReducer,
    complexDetailReducer: complexDetailReducer,
    fieldDetailReducer: fieldDetailReducer,
    complexReducerOwner: complexReducerOwner,
    getOwnerReducer: getOwnerReducer,
    fieldsReducer:fieldsReducer,
    GamesIncompleteReducer: GamesIncompleteReducer,
    getFieldsR: getFieldsR,
    games: games,
    getPlayersReducer: getPlayersReducer,
    complexReducer: complexReducer,
    suppliesReducer:suppliesReducer,
    paymentsReducer: paymentsReducer,
    getTournamentReducer: getTournamentReducer,
    teamsReducer:teamsReducer,

    
})

export default reducers;
 