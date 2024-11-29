import {MODIFY_COMPLEX} from "./modifyComplexAction"

const initialState = {
    complex: {}
}

export default function modifyComplexReducer (state = initialState, action){
    switch (action.type) {    
        case MODIFY_COMPLEX:
            return {
                ...state,
                complex: action.payload,
            }
        default:
            return state;
    }
}