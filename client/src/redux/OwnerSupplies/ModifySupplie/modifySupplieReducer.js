import {MODIFY_SUPPLIE} from "./modifySupplieAction"

const initialState = {
    supplie: {}
}

export default function modifySupplieReducer (state = initialState, action){
    switch (action.type) {    
        case MODIFY_SUPPLIE:
            return {
                ...state,
                supplie: action.payload,
            }
        default:
            return state;
    }
}