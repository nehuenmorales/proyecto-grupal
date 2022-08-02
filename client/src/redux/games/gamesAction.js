import axios from "axios";

export const GET_GAME_SPORT = "GET_GAME_SPORT"
export const GET_GAMES_BY_ID = 'GET_GAMES_BY_ID';
export const UPDATE_GAME="UPDATE_GAME"
 export const GET_SEARCH_GAME_SPORT = "GET_SEARCH_GAME_SPORT"
 export const GAMES_ORDER = "GAMES_ORDER"

 
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
  
  export function getSearchGames(input,sport) {
  
    return dispatch =>{
      axios.get(`/games/${sport}/searchGame?name=${input}`)
        .then(res => {
          console.log("entro", res.data)
          dispatch({
            type: GET_SEARCH_GAME_SPORT,
            payload: res.data
          })
        })
        .catch (e=>
          console.log(e)
        ) 
    }
  }


  export function gamesOrderByPrice (order){
      return {
       type: GAMES_ORDER,
       payload: order
  };
  }

  // export const getSearchGame=(input,sport)=>{
  //   return async function (dispatch){
  //     return axios.get("/owner/createGame",body)
  //     .then((res)=> {
  //         console.log("llega al reducer",res)
  //         return dispatch({type:CREATE_GAME,payload:res})})
  // }   }


export function getGamesById(id) {
    
      return dispatch =>{
        axios.get(`https://falta-uno-1.herokuapp.com/games/detail/${id}`)
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