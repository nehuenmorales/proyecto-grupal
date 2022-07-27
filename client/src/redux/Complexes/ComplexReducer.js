import{GET_COMPLEX, GET_SEARCH_COMPLEX} from "./ComplexAction"

const initialState = {
    complex: [],
    complexSearch:[]
}

export default function complexReducer (state = initialState, action){
    switch (action.type) {    
        case GET_COMPLEX:
            return {
                ...state,
                complex: action.payload,
                complexSearch:[]
            }
        case GET_SEARCH_COMPLEX:
            return{
                ...state,
                complexSearch: action.payload,
            }
        default:
            return state;
    }
}