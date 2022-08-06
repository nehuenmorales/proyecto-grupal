import{GET_GAME_SPORT, GET_SEARCH_GAME_SPORT, GAMES_ORDER, CREATE_GAME,GET_GAMES_BY_ID,UPDATE_GAME, SEND_INVITATION} from "./gamesAction.js"

const initialState = {
    gamesSport:[],
    gameDetail:{},
    gamesSportSearch:[],
    allGames:[],
    ownerGames:[],
}

export default function games(state = initialState, action){
    switch (action.type) {    
        case GET_GAME_SPORT:
            return {
                ...state,
                gamesSport: action.payload,
                gamesSportSearch:[]
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
        case GET_SEARCH_GAME_SPORT:
            return{
                ...state,
                gamesSportSearch:action.payload,
            }
        case GAMES_ORDER:
            let ordenado=[]
            if (state.gamesSportSearch.length) {
                ordenado=state.gamesSportSearch.slice()
                if(action.payload==="mayorAmenor"){
                    ordenado=ordenado.sort(function (a, b) {
                        if (a.pricePerTurn < b.pricePerTurn) {
                          return 1;
                        }
                        if (a.pricePerTurn > b.pricePerTurn) {
                          return  -1;
                        }
                
                        return 0;
                })}else{
                    ordenado=ordenado.sort(function (a, b) {
                        if (a.pricePerTurn < b.pricePerTurn) {
                          return -1;
                        }
                        if (a.pricePerTurn > b.pricePerTurn) {
                          return  1;
                        }
                
                        return 0;
                })}
                return{
                    ...state,
                    gamesSportSearch:ordenado
                }
            }else{
                ordenado=state.gamesSport.slice()
                if(action.payload==="mayorAmenor"){
                    ordenado=ordenado.sort(function (a, b) {
                        if (a.pricePerTurn < b.pricePerTurn) {
                          return 1;
                        }
                        if (a.pricePerTurn > b.pricePerTurn) {
                          return  -1;
                        }
                
                        return 0;
                })}else{
                    ordenado=ordenado.sort(function (a, b) {
                        if (a.pricePerTurn < b.pricePerTurn) {
                          return -1;
                        }
                        if (a.pricePerTurn > b.pricePerTurn) {
                          return  1;
                        }
                
                        return 0;
                })}
                return{
                    ...state,
                    gamesSport:ordenado
                }
            }
            case CREATE_GAME:
                return{
                    ...state,
                    allGames: [...state.allGames, action.payload],
                    ownerGames: [...state.ownerGames, action.payload],
                }
            case SEND_INVITATION:
                return{
                    ...state
                }
        default:
            return state;
    }
}