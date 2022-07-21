import { CREATE_GAME, PUT_GAME } from "./gameActions";

const initialState ={
    allGames:[],
    ownerGames:[],
}

const reducer = (state = initialState , action)=>{
    switch (action.type) {
        case CREATE_GAME:
            return{
                ...state,
                allGames: [...state.allGames, action.payload],
                ownerGames: [...state.ownerGames, action.payload],
            }
            
        default:
            return state
    }
}

export default reducer;