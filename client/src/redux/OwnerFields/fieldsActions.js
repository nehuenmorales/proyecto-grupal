import axios from "axios";

export const CREATE_FIELD = "CREATE_FIELD";
export const PUT_FIELD = "PUT_FIELD";

export const createField =(body)=>{
    console.log("llega a las actions",body)
    return async function (dispatch){
        return axios.post("/owner/createField",body)
        .then((res) => {console.log(res.data) 
            return res})
        .then((res)=> {
            console.log("llega al reducer",res.data)
            return dispatch({type:CREATE_FIELD,payload:res.data})})    
    }   
}

