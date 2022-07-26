import axios from "axios";

export const CREATE_SUPPLIES = "CREATE_SUPPLIES";
export const PUT_SUPPLIES = "PUT_SUPPLIES";

export const createSupplies =(body)=>{
    console.log("llega a las actions",body)
    return async function (dispatch){
        return axios.post("/owner/createSupplies",body)
        .then((res)=> {
            console.log("llega al reducer",res)
            return dispatch({type:CREATE_SUPPLIES,payload:res})})
    }   
}