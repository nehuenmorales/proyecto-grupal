import {GET_FIELD_DETAIL} from "./FieldDetailAction"

const initialState = {
    fieldDetail: {}
}

export default function fieldDetailReducer (state = initialState, action){
    switch (action.type) {    
        case GET_FIELD_DETAIL:
            return {
                ...state,
                fieldDetail: action.payload,
            }
        default:
            return state;
    }
}