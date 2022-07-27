import axios from "axios";

export const GET_FIELDS = 'GET_FIELDS';
export const GET_SEARCH_FIELDS = 'GET_SEARCH_FIELDS';



// export default function getAllFields(sport) {
//     console.log('entro a la action')
//     return async function (dispatch) {
    
//         const response = await axios.get(`http://localhost:3001/fields/${sport}`);
//         return dispatch({ type: GET_FIELDS, payload: response.data })
        
//     }
// }

export function getAllFields(sport) {
  
    return dispatch =>{
      axios.get(`/fields/${sport}`)
        .then(res => {
          dispatch({
            type: GET_FIELDS,
            payload: res.data
          })
          console.log('entro a la action',res.data)
        })
        .catch (e=>
          console.log(e)
        ) 
    }
  }

  export function getSearchFields(sport, input) {
  
    return dispatch =>{
      axios.get(`/fields/${sport}/getSearchField?name=${input}`)
        .then(res => {
          console.log(res.data,'actiooooon')
          dispatch({
            type: GET_SEARCH_FIELDS,
            payload: res.data
          })
          console.log('entro a la action',res.data)
        })
        .catch (e=>
          console.log(e)
        ) 
    }
  }
