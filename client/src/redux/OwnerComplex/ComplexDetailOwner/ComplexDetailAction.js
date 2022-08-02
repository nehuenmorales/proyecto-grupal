import axios from "axios";

export const GET_COMPLEX_DETAIL = "GET_COMPLEX_DETAIL"
 
 export function getComplexDetail(id) {
   console.log(id, 'soy id')
    return dispatch =>{
      axios.get(`/owner/getComplexDetail/${id}`)
        .then(res => {
          console.log('soy respuesta', res.data)
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