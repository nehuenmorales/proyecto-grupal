import axios from "axios";

export const GET_COMPLEX = "GET_COMPLEX"
export const GET_SEARCH_COMPLEX = "GET_SEARCH_COMPLEX"
export const ORDER_COMPLEX = "ORDER_COMPLEX"
export const RATING_COMPLEX = "RATING_COMPLEX"

 
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
      axios.get(`https://falta-uno-1.herokuapp.com/complex/${sport}/searchComplex?name=${input}`)
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

  export function orderComplexRating (order){
    return {
     type: ORDER_COMPLEX,
     payload: order
};
}

export function ratingComplex(id,rating) {
  return async function (dispatch) {
    const {data} = await axios.put(
      `https://falta-uno-1.herokuapp.com/complex/rating/${id}/${rating}`
    );
    dispatch({type: RATING_COMPLEX, payload: data});
  };
}