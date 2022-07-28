import axios from "axios";

export const CREATE_COMPLEX = "CREATE_COMPLEX";

export const createComplex =(body)=>{
    console.log("llega a las actions create complex",body)
    return async function (dispatch){
        return axios.post("http://localhost:3001/owner/createComplex",body)
        .then((res)=> {
            console.log("llega al reducer create complex",res.data)
            return dispatch({type:CREATE_COMPLEX,payload:res.data})})    
    }   
}

