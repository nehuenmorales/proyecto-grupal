import axios from "axios";

export const GET_COMPLEX = "GET_COMPLEX"
export const GET_SEARCH_COMPLEX = "GET_SEARCH_COMPLEX"
 
 export function getComplex() {
    return dispatch =>{
      axios.get(`/complex/all`)
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
  export function getSearchComplex(sport,input) {
    return dispatch =>{
      axios.get(`/${sport}/searchComplex?name=${input}`)
        .then(res => {
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