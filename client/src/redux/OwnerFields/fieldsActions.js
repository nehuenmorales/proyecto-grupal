import axios from "axios";

export const CREATE_FIELD = "CREATE_FIELD";
export const PUT_FIELD = "PUT_FIELD";

export const createField =(body)=>{
    return async function (dispatch){
        return axios.post("https://falta-uno-1.herokuapp.com/owner/createField",body)
        .then((res) => {console.log(res.data) 
            return res})
        .then((res)=> {
            return dispatch({type:CREATE_FIELD,payload:res.data})})    
    }   
}

