import {GET_COMPLEX_DETAIL} from "./ComplexDetailAction"

const initialState = {
    complexDetail: {}
}

export default function complexDetailReducer (state = initialState, action){
    switch (action.type) {    
        case GET_COMPLEX_DETAIL:
            return {
                ...state,
                complexDetail: action.payload,
            }
        default:
            return state;
    }
}