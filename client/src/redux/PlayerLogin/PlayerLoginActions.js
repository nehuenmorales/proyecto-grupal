import axios  from "axios";

export const POST_PLAYER = "POST_PLAYER";

export function postPlayer( payload ) {
  return dispatch => {
    axios.post(`http://localhost:3001/player/createplayer`, payload)
    .then((res) => {
      dispatch({ type: "POST_PLAYER", payload: res.data })
    })
    .catch((err) => {
      console.log(err);
    })
  }
}