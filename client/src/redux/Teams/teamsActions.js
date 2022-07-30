import axios from "axios";

export const CREATE_TEAM = "CREATE_TEAM";

export function createTeam(input) {
  return (dispatch) => {
    console.log("soy body en el action", input);
    axios
      .post(`/teams/createTeams`, input)
      .then((res) => {
        dispatch({
          type: CREATE_TEAM,
          payload: res.data,
        });
      })
      .catch((e) => console.log(e));
  };
}
