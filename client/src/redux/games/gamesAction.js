import axios from "axios";

export const GET_GAME_SPORT = "GET_GAME_SPORT"
export const GET_GAMES_BY_ID = 'GET_GAMES_BY_ID';
export const UPDATE_GAME="UPDATE_GAME"
 
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


export function getGamesById(id) {
    
      return dispatch =>{
        axios.get(`/games/detail/${id}`)
          .then(res => {
            dispatch({
              type: GET_GAMES_BY_ID,
              payload: res.data
            })
          })
          .catch (e=>
            console.log(e)
          ) 
      }
}


export function updateGame(id,body) {
  console.log("update id",id)
  console.log("update body",body)
    
      return dispatch =>{
        axios.put(`/games/updateGame`,body)
          .then(res => {
            dispatch({
              type: UPDATE_GAME,
              payload: res.data
            })
          })
          .catch (e=>
            console.log(e)
          ) 
      }
    }