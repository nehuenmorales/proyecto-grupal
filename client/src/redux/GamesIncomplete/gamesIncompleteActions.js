import axios from "axios";

export const GET_GAMES_INCOMPLETE = "GET_GAMES_INCOMPLETE";
export const GET_DETAIL_INCOMPLETE = "GET_DETAIL_INCOMPLETE"

export function getGamesIncomplete() {
    return dispatch =>{
      axios.get(`http://localhost:3001/games/gamesIncomplete`)   
        .then(res => {
          dispatch({
            type: GET_GAMES_INCOMPLETE,
            payload: res.data
          })
        })
        .catch(e=>
          console.log(e)
        )
              
    }
  }
  
  export function getDetailIncomplete(gameid) {
    
    return dispatch =>{
      axios.get(`http://localhost:3001/games/gamesIncomplete/${gameid}`)
        .then(res => {
          dispatch({
            type: GET_DETAIL_INCOMPLETE,
            payload: res.data
          })
        })
        .catch (e=>
          console.log(e)
        ) 
    }
  }

