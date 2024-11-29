import {MODIFY_FIELD} from "./modifyFieldAction"

const initialState = {
    field: {}
}

export default function modifyFieldReducer (state = initialState, action){
    switch (action.type) {    
        case MODIFY_FIELD:
            return {
                ...state,
                field: action.payload,
            }
        default:
            return state;
    }
}