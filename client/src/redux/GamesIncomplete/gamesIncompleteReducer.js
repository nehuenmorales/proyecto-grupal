import { GET_GAMES_INCOMPLETE,GET_DETAIL_INCOMPLETE, GET_SEARCH_GAMES_INCOMPLETE } from "./gamesIncompleteActions";

const initialState = {
    gamesIncomplete: [],
    gamesDetail:[],
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
        case GET_SEARCH_GAMES_INCOMPLETE:
            //let filtrado=action.payload.filter((e)=>e.name)
            return{
                ...state,
                gamesIncomplete: action.payload,

            }
        default:
            return state;
    }
}