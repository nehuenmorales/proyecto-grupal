import axios from "axios";

export const MODIFY_COMPLEX = "MODIFY_COMPLEX"
 
 export function modifyComplex(body, id) {
    return dispatch =>{
      axios.put(`https://falta-uno-1.herokuapp.com/owner/modifyComplex/${id}`, body)
        .then(res => {
          console.log('soy modify complex action', res.data)
          dispatch({
            type: MODIFY_COMPLEX,
            payload: res.data
          })
        })
        .catch (e=>
          console.log(e)
        ) 
    }
  }