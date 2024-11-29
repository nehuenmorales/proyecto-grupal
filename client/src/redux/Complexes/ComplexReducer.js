import{GET_COMPLEX, GET_SEARCH_COMPLEX,ORDER_COMPLEX,RATING_COMPLEX} from "./ComplexAction"

const initialState = {
    complex: [],
    complexSearch:[],
    rating:[],
}

export default function complexReducer (state = initialState, action){
    switch (action.type) {    
        case GET_COMPLEX:
            return {
                ...state,
                complex: action.payload,
                complexSearch:[]
            }
        case RATING_COMPLEX:
            return {
                ...state,
                rating: action.payload,
            }
        case GET_SEARCH_COMPLEX:
            return{
                ...state,
                complexSearch: action.payload,
            }
        case ORDER_COMPLEX:
            let ordenado=[]
            if (state.complexSearch.length) {
                ordenado=state.complexSearch.slice()
                if(action.payload==="mayorAmenor"){
                    ordenado=ordenado.sort(function (a, b) {
                        if (a.rating < b.rating) {
                          return 1;
                        }
                        if (a.rating > b.rating) {
                          return  -1;
                        }
                
                        return 0;
                })}else{
                    ordenado=ordenado.sort(function (a, b) {
                        if (a.rating < b.rating) {
                          return -1;
                        }
                        if (a.rating > b.rating) {
                          return  1;
                        }
                
                        return 0;
                })}
                return{
                    ...state,
                    complexSearch:ordenado
                }
            }else{
                ordenado=state.complex.slice()
                if(action.payload==="mayorAmenor"){
                    ordenado=ordenado.sort(function (a, b) {
                        if (a.rating < b.rating) {
                          return 1;
                        }
                        if (a.rating > b.rating) {
                          return  -1;
                        }
                
                        return 0;
                })}else{
                    ordenado=ordenado.sort(function (a, b) {
                        if (a.rating < b.rating) {
                          return -1;
                        }
                        if (a.rating > b.rating) {
                          return  1;
                        }
                
                        return 0;
                })}
                return{
                    ...state,
                    complex:ordenado
                }
            }
        
        default:
            return state;
    }
}