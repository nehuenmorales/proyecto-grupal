import axios from "axios";

export const GET_COMPLEX_DETAIL = "GET_COMPLEX_DETAIL"
 
 export function getComplexDetail(id) {
    return dispatch =>{
      axios.get(`https://falta-uno-1.herokuapp.com/owner/getComplexDetail/${id}`)
        .then(res => {
          dispatch({
            type: GET_COMPLEX_DETAIL,
            payload: res.data
          })
        })
        .catch (e=>
          console.log(e)
        ) 
    }
  }