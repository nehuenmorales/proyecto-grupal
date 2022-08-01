import { GET_GAMES_INCOMPLETE,GET_DETAIL_INCOMPLETE, GET_SEARCH_GAMES_INCOMPLETE,ORDER_GAMES_INCOMPLETE,PUT_GAME } from "./gamesIncompleteActions";

const initialState = {
    gamesIncomplete: [],
    gamesDetail:[],
    putGame:[],
    gamesSearchIncomplete:[]
}

export default function GamesIncompleteReducer (state = initialState, action){
    switch (action.type) {    
        case GET_GAMES_INCOMPLETE:
            return {
                ...state,
                gamesIncomplete: action.payload,
                gamesSearchIncomplete:[]

            }
        case GET_DETAIL_INCOMPLETE:
            return {
                ...state,
                gamesDetail: action.payload
            }
        case PUT_GAME:
            return {
                ...state,
                putGame: action.payload,
         };
        case GET_SEARCH_GAMES_INCOMPLETE:
            //let filtrado=action.payload.filter((e)=>e.name)
            return{
                ...state,
                gamesSearchIncomplete: action.payload,

            }
        case ORDER_GAMES_INCOMPLETE:
            let ordenado=[]
            console.log("soy el reducer",state.gamesIncomplete)
            if (state.gamesSearchIncomplete.length) {
                ordenado=state.gamesSearchIncomplete.slice()
                if(action.payload==="mayorAmenor"){
                    ordenado=ordenado.sort(function (a, b) {
                        if (parseInt(a.freeplace) < parseInt(b.freeplace)) {
                          return 1;
                        }
                        if (parseInt(a.freeplace) > parseInt(b.freeplace)) {
                          return  -1;
                        }
                
                        return 0;
                })}else{
                    ordenado=ordenado.sort(function (a, b) {
                        if (parseInt(a.freeplace) < parseInt(b.freeplace)) {
                          return -1;
                        }
                        if (parseInt(a.freeplace) > parseInt(b.freeplace)) {
                          return  1;
                        }
                
                        return 0;
                })}
                return{
                    ...state,
                    gamesSearchIncomplete:ordenado
                }
            }else{
                ordenado=state.gamesIncomplete.slice()
                if(action.payload==="mayorAmenor"){
                    ordenado=ordenado.sort(function (a, b) {
                        if (parseInt(a.freeplace) < parseInt(b.freeplace)) {
                          return 1;
                        }
                        if (parseInt(a.freeplace) > parseInt(b.freeplace)) {
                          return  -1;
                        }
                
                        return 0;
                })}else{
                    ordenado=ordenado.sort(function (a, b) {
                        if (parseInt(a.freeplace) < parseInt(b.freeplace)) {
                          return -1;
                        }
                        if (parseInt(a.freeplace) > parseInt(b.freeplace)) {
                          return  1;
                        }
                
                        return 0;
                })}
                return{
                    ...state,
                    gamesIncomplete:ordenado
                }
            }
        default:
            return state;
    }
}