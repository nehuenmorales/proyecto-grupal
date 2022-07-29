import { CREATE_COMPLEX} from "./complexActions";

const initialState ={
    complex:[],
}

const complexReducerOwner = (state = initialState , action)=>{
    switch (action.type) {
        case CREATE_COMPLEX:
            return{
                ...state,
                complex:action.payload,
            }
            
        default:
            return state
    }
}

export default complexReducerOwner;