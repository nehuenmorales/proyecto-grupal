import { GET_FIELDS, GET_SEARCH_FIELDS } from './DetailField-action';


const initialState = {
    fields: [],
    fieldsSearch:[]
};

export default function getFieldsR (state = initialState,  action){

    switch (action.type) { 
        case GET_FIELDS:
            return {
                ...state,
                fields: action.payload
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