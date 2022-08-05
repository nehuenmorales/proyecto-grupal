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
    console.log("input",input)
    return dispatch =>{
      axios.get(`/player/getSearchPlayer?name=${input}`)
        .then(res => {
          console.log("informacion que trae del reducer",res.data)
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
      axios.get(`/player/getPlayerProfile/?email=${email}`)
        .then(res => {
          console.log("esta es la respuesta bro",res.data)
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
      axios.put(`/player/modifyProfile?email=${email}`, obj)
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