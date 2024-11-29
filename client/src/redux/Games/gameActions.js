import axios from "axios";

export const CREATE_GAME = "CREATE_GAME";
export const PUT_GAME = "PUT_GAME";

export const createGame =(body)=>{
    return async function (dispatch){
        return axios.post("https://falta-uno-1.herokuapp.com/owner/createGame",body)
        .then((res)=> {
            return dispatch({type:CREATE_GAME,payload:res})})
    }   
}
