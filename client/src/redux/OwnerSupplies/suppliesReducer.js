import { CREATE_SUPPLIES} from "./suppliesActions";

const initialState ={
    allSupplies:[],
    ownerSupplies:[],
}

const reducer = (state = initialState , action)=>{
    switch (action.type) {
        case CREATE_SUPPLIES:
            return{
                ...state,
                allSupplies: [...state.allSupplies, action.payload],
                ownerSupplies: [...state.ownerSupplies, action.payload],
            }
            
        default:
            return state
    }
}

export default reducer;