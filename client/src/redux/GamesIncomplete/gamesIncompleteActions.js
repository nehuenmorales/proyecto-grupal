import axios from "axios";

export const GET_GAMES_INCOMPLETE = "GET_GAMES_INCOMPLETE";
export const GET_DETAIL_INCOMPLETE = "GET_DETAIL_INCOMPLETE";
export const PUT_GAME = "PUT_GAME";
export const GET_SEARCH_GAMES_INCOMPLETE = "GET_SEARCH_GAMES_INCOMPLETE";
export const ORDER_GAMES_INCOMPLETE = "ORDER_GAMES_INCOMPLETE";



export function getGamesIncomplete() {
    return dispatch =>{
      axios.get(`https://falta-uno-1.herokuapp.com/games/gamesIncomplete`)   
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
      axios.get(`https://falta-uno-1.herokuapp.com/games/gamesIncomplete/${gameid}`)
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
  export function getSearchGamesIncomplete(input,sport) {
    return dispatch =>{
      axios.get(`https://falta-uno-1.herokuapp.com/games/${sport}/searchGameIncomplete?name=${input}`)   
        .then(res => {
          dispatch({
            type: GET_SEARCH_GAMES_INCOMPLETE,
            payload: res.data,
            
          })
        })
        .catch(e=>
          console.log(e)
        )
              
    }
  }

  export function putGame(id, email) {
    console.log(id,email,"actions put")
    return async function (dispatch) {
      const {data} = await axios.put(
        `https://falta-uno-1.herokuapp.com/games/gamesIncomplete/${id}`,
        email
      );
      console.log(data, "action data")
      dispatch({type: PUT_GAME, payload: data});
    };
  }

  export function gamesIncompleteOrderByAmount (order){
    return {
     type: ORDER_GAMES_INCOMPLETE,
     payload: order
};
}
