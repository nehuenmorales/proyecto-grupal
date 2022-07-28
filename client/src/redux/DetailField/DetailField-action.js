import axios from "axios";

export const GET_FIELDS = 'GET_FIELDS';
export const GET_FIELDS_BY_ID = 'GET_FIELDS_BY_ID';

export function getFieldById(id) {
  
    return dispatch =>{
      axios.get(`/fields/detail/${id}`)
        .then(res => {
          dispatch({
            type: GET_FIELDS_BY_ID,
            payload: res.data
          })
        })
        .catch (e=>
          console.log(e)
        ) 
    }
  }

export function getAllFields(sport) {
  
    return dispatch =>{
      axios.get(`/fields/${sport}`)
        .then(res => {
          console.log(res.data,'actiooooon')
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
