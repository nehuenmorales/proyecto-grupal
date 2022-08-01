import axios from "axios";

export const GET_COMPLEX = "GET_COMPLEX"
export const GET_SEARCH_COMPLEX = "GET_SEARCH_COMPLEX"
export const ORDER_COMPLEX = "ORDER_COMPLEX"

 
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
  export function getSearchComplex(input,sport) {
    return dispatch =>{
      axios.get(`/complex/${sport}/searchComplex?name=${input}`)
        .then(res => {
          console.log("hola soy la action", res.data)
          dispatch({
            type: GET_SEARCH_COMPLEX,
            payload: res.data
          })
        })
        .catch (e=>
          console.log(e)
        ) 
    }
  }

  export function orderComplexRating (order){
    return {
     type: ORDER_COMPLEX,
     payload: order
};
}