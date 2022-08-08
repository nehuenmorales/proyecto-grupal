import { CREATE_SPONSOR, GET_ALL_SPONSORS,CREATE_PRODUCT} from "./SponsorsActions";

const initialState ={
    Sponsor:[],
    Product:[],
    AllSponsors:[],
}

const SponsorsReducer = (state = initialState , action)=>{
    switch (action.type) {
        case CREATE_SPONSOR:
            return{
                ...state,
                Sponsor:action.payload,
            }
        case CREATE_PRODUCT:
            return{
                ...state,
                Product:action.payload,
            }
        case GET_ALL_SPONSORS:
            return{
                ...state,
                AllSponsors:action.payload,
            }
            
        default:
            return state
    }
}

export default SponsorsReducer;