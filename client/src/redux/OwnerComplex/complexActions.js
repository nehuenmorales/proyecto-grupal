import axios from "axios";

export const CREATE_COMPLEX = "CREATE_COMPLEX";

export const createComplex =(body)=>{
    console.log("llega a las actions create complex, soy id", body)
    return async function (dispatch){
        return axios.post("/owner/createComplex",body)
        .then((res)=> {
            console.log("respuesta del post",res.data)
            return dispatch({type:CREATE_COMPLEX,payload:res.data})})    
    }   
}

