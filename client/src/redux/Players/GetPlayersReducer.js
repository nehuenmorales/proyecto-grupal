import{GET_PLAYERS, GET_SEARCH_PLAYER, GET_PLAYER_PROFILE} from "./GetPlayersAction"

const initialState = {
    players: [],
    playerSearch: [],
    playerProfile:{}
}

export default function getPlayersReducer (state = initialState, action){
    switch (action.type) {    
        case GET_PLAYERS:
            return {
                ...state,
                players: action.payload,
                playerSearch: [],

            }
        case GET_SEARCH_PLAYER:
            return {
                ...state,
                playerSearch: action.payload
            }
        case GET_PLAYER_PROFILE:
            return {
                ...state,
                playerProfile: action.payload[0]
            }
        default:
            return state;
    }
}