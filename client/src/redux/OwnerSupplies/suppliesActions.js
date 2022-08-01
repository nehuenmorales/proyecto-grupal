import axios from "axios";

export const CREATE_SUPPLIES = "CREATE_SUPPLIES";
export const PUT_SUPPLIES = "PUT_SUPPLIES";
export const GET_SUPPLIES="GET_SUPPLIES";

export const createSupplies =(body)=>{
    console.log("llega a las actions",body)
    return async function (dispatch){
        return axios.post("https://falta-uno-1.herokuapp.com/owner/createSupplies",body)
        .then((res)=> {
            return dispatch({type:CREATE_SUPPLIES,payload:res})})
    }   
}


export function getSupplies(id,sport) {
    console.log(id,sport,"get supplies")
    return async function (dispatch) {
        console.log("entra",sport)
        const {data} = await axios.get(`/supplies/${sport}/${id}`);
      dispatch({type: GET_SUPPLIES, payload: data});
    };
  }