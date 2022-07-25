import{GET_PLAYERS} from "./GetPlayersAction"

const initialState = {
    players: []
}

export default function getPlayersReducer (state = initialState, action){
    switch (action.type) {    
        case GET_PLAYERS:
            return {
                ...state,
                players: action.payload,
            }
        default:
            return state;
    }
}