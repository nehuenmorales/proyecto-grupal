import axios from "axios";

export const GET_SEARCH_TOURNAMENT = "GET_SEARCH_TOURNAMENT";


export function getSearcTournament(sport,input) {
    return dispatch =>{
      axios.get(`https://falta-uno-1.herokuapp.com/${sport}/searchTournamet?name=${input}`)
        .then(res => {
          dispatch({
            type: GET_SEARCH_TOURNAMENT,
            payload: res.data
          })
        })
        .catch (e=>
          console.log(e)
        ) 
    }
  }