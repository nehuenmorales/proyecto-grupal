import{GET_GAME_SPORT} from "./gamesAction"

const initialState = {
    games: [],
    gamesSport:[],
}

export default function gamesReducer (state = initialState, action){
    switch (action.type) {    
        case GET_GAME_SPORT:
            return {
                ...state,
                gamesSport: action.payload,
            }
        default:
            return state;
    }
}