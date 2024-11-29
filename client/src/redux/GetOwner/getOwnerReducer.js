import { GET_OWNER } from "./getOwnerAction";

const initialState ={
    owner:{}
}

const getOwnerReducer = (state = initialState , action)=>{
    switch (action.type) {
        case GET_OWNER:
            return{
                ...state,
                owner: action.payload
            }
            
        default:
            return state
    }
}

export default getOwnerReducer;