import {GET_SUPPLIE_DETAIL} from "./SuppliesDetailAction"

const initialState = {
    supplieDetail: {}
}

export default function supplieDetailReducer (state = initialState, action){
    switch (action.type) {    
        case GET_SUPPLIE_DETAIL:
            return {
                ...state,
               supplieDetail: action.payload,
            }
        default:
            return state;
    }
}