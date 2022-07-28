import axios from "axios";

export const GET_PLAYERS = "GET_PLAYERS"
export const GET_SEARCH_PLAYER = "GET_SEARCH_PLAYER"
export const GET_PLAYER_PROFILE = "GET_PLAYER_PROFILE"
 
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