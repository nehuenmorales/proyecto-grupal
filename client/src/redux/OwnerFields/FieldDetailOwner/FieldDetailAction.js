import axios from "axios";

export const GET_FIELD_DETAIL = "GET_FIELD_DETAIL"
 
 export function getFieldDetail(id) {
//    console.log(id, 'soy id')
    return dispatch =>{
      axios.get(`https://falta-uno-1.herokuapp.com/owner/getFieldDetail/${id}`)
        .then(res => {
          console.log('soy respuesta', res.data)
          dispatch({
            type: GET_FIELD_DETAIL,
            payload: res.data
          })
        })
        .catch (e=>
          console.log(e)
        ) 
    }
  }