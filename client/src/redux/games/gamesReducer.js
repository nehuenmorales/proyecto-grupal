import{GET_GAME_SPORT, GET_SEARCH_GAME_SPORT, GAMES_ORDER} from "./gamesAction"

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
        
        default:
            return state;
    }
}