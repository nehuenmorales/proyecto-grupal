import {combineReducers } from 'redux';
import fieldsReducer from "./OwnerFields/fieldsReducer";
import suppliesReducer from "./OwnerSupplies/suppliesReducer"
import GamesIncompleteReducer from "./GamesIncomplete/gamesIncompleteReducer"
import getFieldsR from './DetailField/DetailField-reducer';
import games from './NuevoGames/gamesReducer'
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
import supplieDetailReducer from './OwnerSupplies/SuppliesDetailOwner/SuppliesDetailReducer'
import modifySupplieReducer from './OwnerSupplies/ModifySupplie/modifySupplieReducer'
import modifyFieldReducer from './OwnerFields/ModifyField/modifyFieldReducer'
import gamesOwnerReducer from './OwnerGames/ownerGamesReducer'
import SponsorsReducer from "./Sponsors/SponsorsReducer"

export const reducers = combineReducers({
    gamesOwnerReducer: gamesOwnerReducer,
    modifySupplieReducer: modifySupplieReducer,
    supplieDetailReducer: supplieDetailReducer,
    modifyComplexReducer: modifyComplexReducer,
    complexDetailReducer: complexDetailReducer,
    fieldDetailReducer: fieldDetailReducer,
    modifyFieldReducer: modifyFieldReducer,
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
    SponsorsReducer:SponsorsReducer,
    
})

export default reducers;
 