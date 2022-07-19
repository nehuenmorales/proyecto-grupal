import axios from "axios";

export const CREATE_FIELD = "CREATE_FIELD";
export const PUT_FIELD = "PUT_FIELD";

export const createField =(body)=>{
    console.log(body)
    return async function (dispatch){
        return axios.post("http://localhost:3001/owner/createField",body)
        .then((res)=> dispatch({type:CREATE_FIELD,payload:res}))
    }   
}
