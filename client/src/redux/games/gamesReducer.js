import{GET_GAME_SPORT,GET_GAMES_BY_ID,UPDATE_GAME} from "./gamesAction"

const initialState = {
    gamesSport:[],
    gameDetail:{}
}

export default function games(state = initialState, action){
    switch (action.type) {    
        case GET_GAME_SPORT:
            return {
                ...state,
                gamesSport: action.payload,
            }
        case GET_GAMES_BY_ID:
            return{
                ...state,
                gameDetail: action.payload,
            }
        case UPDATE_GAME:
            return{
                ...state
            }
        default:
            return state;
    }
}