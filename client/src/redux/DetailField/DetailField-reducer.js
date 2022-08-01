import { GET_FIELDS,GET_FIELDS_BY_ID } from './DetailField-action';
import { GET_SEARCH_FIELDS } from './DetailField-action';


const initialState = {
    fields: [],
    detailFields:[],
    fieldsSearch:[]
};

export default function getFieldsR (state = initialState,  action){

    switch (action.type) { 
        case GET_FIELDS:
            return {
                ...state,
                fields: action.payload
            }
            case GET_FIELDS_BY_ID:
            return {
                ...state,
                detailFields: action.payload
            } 
        case GET_SEARCH_FIELDS:
            return {
                ...state,
                fieldsSearch: action.payload
            }      
        default:
            return state;
    }
}