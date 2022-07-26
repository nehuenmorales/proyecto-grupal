import axios from "axios";

export const GET_OWNER = "GET_OWNER";

export const getOwner =(id)=>{
    return async function (dispatch){
        return axios.get(`http://localhost:3001/owner/getOwner/${id}`)
        .then((res)=> {
            return dispatch({type:GET_OWNER,payload:res.data})})
    }   
}
