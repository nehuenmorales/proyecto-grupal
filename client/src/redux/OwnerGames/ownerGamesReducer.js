import { GET_GAMES_OWNER } from "./ownerGamesAction";

const initialState ={
    allGames:[]
}

const gamesOwnerReducer = (state = initialState , action)=>{
    switch (action.type) {
        case GET_GAMES_OWNER:
            return{
                ...state,
                allGames: action.payload
            }
            
        default:
            return state
    }
}

export default gamesOwnerReducer;