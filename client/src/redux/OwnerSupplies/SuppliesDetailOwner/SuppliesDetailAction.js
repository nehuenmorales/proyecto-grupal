import axios from "axios";

export const GET_SUPPLIE_DETAIL = "GET_SUPPLIE_DETAIL"
 
 export function getSupplieDetail(id) {
    return dispatch =>{
      axios.get(`https://falta-uno-1.herokuapp.com/owner/getSupplieDetail/${id}`)
        .then(res => {
          dispatch({
            type: GET_SUPPLIE_DETAIL,
            payload: res.data
          })
        })
        .catch (e=>
          console.log(e)
        ) 
    }
  }