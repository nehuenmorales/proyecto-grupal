import axios  from "axios";

export const POST_PLAYER = "POST_PLAYER";

export function postPlayer( payload ) {
  return dispatch => {
    axios.post(`https://falta-uno-1.herokuapp.com/player/createplayer`, payload)
    .then((res) => {
      dispatch({ type: "POST_PLAYER", payload: res.data })
    })
    .catch((err) => {
      console.log(err);
    })
  }
}