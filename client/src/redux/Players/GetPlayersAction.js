import axios from "axios";

export const GET_PLAYERS = "GET_PLAYERS"
 
 export function getPlayers() {
    return dispatch =>{
      axios.get(`/player/getPlayers`)
        .then(res => {
          dispatch({
            type: GET_PLAYERS,
            payload: res.data
          })
        })
        .catch (e=>
          console.log(e)
        ) 
    }
  }