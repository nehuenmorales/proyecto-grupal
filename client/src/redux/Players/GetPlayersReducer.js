import{GET_PLAYERS, GET_SEARCH_PLAYER} from "./GetPlayersAction"

const initialState = {
    players: [],
    playerSearch: [],
}

export default function getPlayersReducer (state = initialState, action){
    switch (action.type) {    
        case GET_PLAYERS:
            return {
                ...state,
                players: action.payload,
            }
        case GET_SEARCH_PLAYER:
            return {
                ...state,
                playerSearch: action.payload
            }
        default:
            return state;
    }
}