import{GET_GAME_SPORT} from "./gamesAction"

const initialState = {
    games: [],
    gamesSport:[],
}

export default function games(state = initialState, action){
    switch (action.type) {    
        case GET_GAME_SPORT:
            console.log("hola bro",action.payload)
            return {
                ...state,
                gamesSport: action.payload,
            }
        default:
            return state;
    }
}