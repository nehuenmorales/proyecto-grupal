import {GET_SEARCH_TOURNAMENT} from "./tounamentAction"

const initialState = {
    tournamentSearch: [],
}

export default function getTournamentReducer (state = initialState, action){
    switch (action.type) {    
        case GET_SEARCH_TOURNAMENT:
            return {
                ...state,
                tournamentSearch: action.payload,
            }
        default: 
        return {
            ...state
        }
        }
    }