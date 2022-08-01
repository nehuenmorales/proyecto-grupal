import axios from "axios";

export const GET_COMPLEX = "GET_COMPLEX"
 
 export function getComplex() {
    return dispatch =>{
      axios.get(`https://falta-uno-1.herokuapp.com/complex/all`)
        .then(res => {
          dispatch({
            type: GET_COMPLEX,
            payload: res.data
          })
        })
        .catch (e=>
          console.log(e)
        ) 
    }
  }