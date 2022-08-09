import axios from "axios";

export const MODIFY_SUPPLIE = "MODIFY_SUPPLIE"
 
 export function modifySupplie(body, id) {
    return dispatch =>{
      axios.put(`/owner/modifySupplies/${id}`, body)
        .then(res => {
          console.log('soy modify supplies action', res.data)
          dispatch({
            type: MODIFY_SUPPLIE,
            payload: res.data
          })
        })
        .catch (e=>
          console.log(e)
        ) 
    }
  }