import axios from "axios";

export const MODIFY_FIELD = "MODIFY_FIELD"
 
 export function modifyField(body, id) {
    return dispatch =>{
      axios.put(`https://falta-uno-1.herokuapp.com/owner/modifyField/${id}`, body)
        .then(res => {
          console.log('soy modify field action', res.data)
          dispatch({
            type: MODIFY_FIELD,
            payload: res.data
          })
        })
        .catch (e=>
          console.log(e)
        ) 
    }
  }