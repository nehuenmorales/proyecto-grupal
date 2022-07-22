 import axios from "axios";

 export const GET_GAME_SPORT = "GET_GAME_SPORT"
 
 export function getGameSport(sport) {
    return dispatch =>{
      axios.get(`http://localhost:3001/games/${sport}`)
        .then(res => {
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