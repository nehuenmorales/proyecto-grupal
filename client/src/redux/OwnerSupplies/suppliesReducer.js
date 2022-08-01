import { CREATE_SUPPLIES,GET_SUPPLIES} from "./suppliesActions";

const initialState ={
    allSupplies:[],
    ownerSupplies:[],
    supplies:[],
}

const reducer = (state = initialState , action)=>{
    switch (action.type) {
        case CREATE_SUPPLIES:
            return{
                ...state,
                allSupplies: [...state.allSupplies, action.payload],
                ownerSupplies: [...state.ownerSupplies, action.payload],
            }
        case GET_SUPPLIES:
            console.log("entro",state.supplies)
            return{
                ...state,
                supplies:action.payload
            }    
            
        default:
            return state
    }
}

export default reducer;