 import axios from "axios";

 export const GET_GAME_SPORT = "GET_GAME_SPORT"
 
 export function getGameSport(sport) {
  
    return dispatch =>{
      axios.get(`/games/${sport}`)
        .then(res => {
          console.log("entro", res.data)
          dispatch({
            type: GET_GAME_SPORT,
            payload: res.data
          })
        })
        .catch (e=>
          console.log(e)
        ) 
    }
  }


  // export function getAllFields(sport) {
  //   return dispatch =>{
  //     axios.get(`/fields/${sport}`)
  //       .then(res => {
  //         dispatch({
  //           type: GET_FIELDS,
  //           payload: res.data
  //         })
  //       })
  //       .catch (e=>
  //         console.log(e)
  //       ) 
  //   }
  // }