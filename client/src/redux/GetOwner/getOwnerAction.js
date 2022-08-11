import axios from "axios";

export const GET_OWNER = "GET_OWNER";

export const getOwner =(id)=>{
    return async function (dispatch){
        return axios.get(`https://falta-uno-1.herokuapp.com/owner/getOwner/${id}`)
        .then((res)=> {
            return dispatch({type:GET_OWNER, payload:res.data})})
    }   
}
