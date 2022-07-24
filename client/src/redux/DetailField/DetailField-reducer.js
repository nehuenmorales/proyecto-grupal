import { GET_FIELDS } from './DetailField-action';


const initialState = {
    fields: []
};

export default function getFieldsR (state = initialState,  action){
    console.log('entro al reducer',state.fields)
    switch (action.type) { 
        case GET_FIELDS:
            return {
                ...state,
                fields: action.payload
            }   
        default:
            return state;
    }
}