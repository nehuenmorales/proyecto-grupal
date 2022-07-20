import { GET_GAMES_INCOMPLETE,GET_DETAIL_INCOMPLETE } from "./gamesIncompleteActions";

const initialState = {
    gamesIncomplete: [],
    gamesDetail:[],
}

export default function GamesIncompleteReducer (state = initialState, action){
    switch (action.type) {    
        case GET_GAMES_INCOMPLETE:
            return {
                ...state,
                gamesIncomplete: action.payload,
            }
        case GET_DETAIL_INCOMPLETE:
            return {
                ...state,
                gamesDetail: action.payload
            }
        default:
            return state;
    }
}