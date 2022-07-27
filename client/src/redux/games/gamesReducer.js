import{GET_GAME_SPORT, GET_SEARCH_GAME_SPORT} from "./gamesAction"

const initialState = {
    games: [],
    gamesSport:[],
    gamesSportSearch:[]
}

export default function games(state = initialState, action){
    switch (action.type) {    
        case GET_GAME_SPORT:
            console.log("hola bro",action.payload)
            return {
                ...state,
                gamesSport: action.payload,
                gamesSportSearch:[]
            }
        case GET_SEARCH_GAME_SPORT:
            return{
                ...state,
                gamesSport:action.payload,
            }
        default:
            return state;
    }
}