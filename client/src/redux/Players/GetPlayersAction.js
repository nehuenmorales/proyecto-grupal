import axios from "axios";

export const GET_PLAYERS = "GET_PLAYERS"
export const GET_SEARCH_PLAYER = "GET_SEARCH_PLAYER"
 
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


   export function getSearchPlayer(sport,input) {
    return dispatch =>{
      axios.get(`/${sport}/searchPlayer?name=${input}`)
        .then(res => {
          dispatch({
            type: GET_SEARCH_PLAYER,
            payload: res.data
          })
        })
        .catch (e=>
          console.log(e)
        ) 
    }
  }