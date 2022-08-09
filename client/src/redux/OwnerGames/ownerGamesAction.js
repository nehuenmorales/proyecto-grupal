import axios from "axios";

export const GET_GAMES_OWNER = "GET_GAMES_OWNER"
 
 export function getGamesOwner(id) {
//    console.log(id, 'soy id')
    return dispatch =>{
        axios.get(`https://falta-uno-1.herokuapp.com/owner/getBookedGamesByOwner/${id}`)
        .then(res => {
            let result= []
            for (let i = 0; i < res.data.length; i++) {
                for (let j = 0; j < res.data[i].length; j++) {
                     result.push(res.data[i][j])
                }
            }
            dispatch({
                type: GET_GAMES_OWNER,
                payload: result,
              })
        })
  }
}