import axios from "axios";

export const GET_PLAYERS = "GET_PLAYERS"
export const GET_SEARCH_PLAYER = "GET_SEARCH_PLAYER"
export const GET_PLAYER_PROFILE = "GET_PLAYER_PROFILE"
export const PUT_PLAYER_MODIFY = "PUT_PLAYER_MODIFY"
export const ORDER_BY_ELO = "ORDER_BY_ELO"

 
 export function getPlayers() {
    return dispatch =>{
      axios.get(`https://falta-uno-1.herokuapp.com/player/getPlayers`)
        .then(res => {
          dispatch({
            type: GET_PLAYERS,
            payload: res.data
          })
        })
        .catch (e =>
          console.log(e)
        ) 
    }
  }


   export function getSearchPlayer(input,sport) {
    return dispatch =>{
      axios.get(`https://falta-uno-1.herokuapp.com/player/getSearchPlayer?name=${input}`)
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

   export function getPlayersProfile(email) {
    return dispatch =>{
      axios.get(`https://falta-uno-1.herokuapp.com/player/getPlayerProfile/?email=${email}`)
        .then(res => {
          dispatch({
            type: GET_PLAYER_PROFILE,
            payload: res.data
          })
        })
        .catch (e=>
          console.log(e)
        ) 
    }
  }

   export function putPlayer(email, obj) {
    return dispatch =>{
      axios.put(`https://falta-uno-1.herokuapp.com/player/modifyProfile?email=${email}`, obj)
        .then(res => {
          dispatch({
            type: PUT_PLAYER_MODIFY,
            payload: res.data
          })
        })
        .catch (e=>
          console.log(e)
        ) 
    }
  }

  export function orderByElo() {
    return dispatch=>{
      dispatch({
      type: ORDER_BY_ELO,
      })
    }

  }