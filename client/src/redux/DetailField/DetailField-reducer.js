import { GET_FIELDS } from './DetailField-action';


const initialState = {
    fields: []
};

export default function getFieldsR (state = initialState, { type, payload }){
    switch (type) { 
        case GET_FIELDS:
            return {
                ...state,
                fields: payload
            }   
        default:
            return state;
    }
}