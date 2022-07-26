import{GET_COMPLEX} from "./ComplexAction"

const initialState = {
    complex: []
}

export default function complexReducer (state = initialState, action){
    switch (action.type) {    
        case GET_COMPLEX:
            return {
                ...state,
                complex: action.payload,
            }
        default:
            return state;
    }
}