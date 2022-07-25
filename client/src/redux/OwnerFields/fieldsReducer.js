import { CREATE_FIELD, PUT_FIELD } from "./fieldsActions";

const initialState ={
    allFields:[],
    ownerFields:[],
    field:{}
}

const reducer = (state = initialState , action)=>{
    switch (action.type) {
        case CREATE_FIELD:
            return{
                ...state,
                allFields: [...state.allFields, action.payload],
                ownerFields: [...state.ownerFields, action.payload],
                field: action.payload,
            }
            
        default:
            return state
    }
}

export default reducer;