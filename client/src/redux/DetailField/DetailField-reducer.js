import { GET_FIELDS,GET_FIELDS_BY_ID } from './DetailField-action';


const initialState = {
    fields: [],
    detailFields:[]
};

export default function getFieldsR (state = initialState,  action){
    console.log('entro al reducer',state.fields)
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
            default:
                return state;
    }
}