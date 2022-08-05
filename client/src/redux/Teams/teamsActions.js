import axios from "axios";

export const CREATE_TEAM = "CREATE_TEAM";
export const GET_TEAM_USER = "GET_TEAM_USER"

export function createTeam(input) {
  return (dispatch) => {
    axios
      .post(`/team/createTeam`, input)
      .then((res) => {
        dispatch({
          type: CREATE_TEAM,
          payload: res.data,
        });
      })
      .catch((e) => console.log(e));
  };
}
///player/getPlayerProfile?email=mmm@mail.com
// /team/getTeamUser/${email}
export function getTeamsUser(email) {
  console.log("hola entro a la action")

  return (dispatch) =>{
    axios.get(`/team/getTeamUser/${email}`)
    .then(res=> {
      
      console.log("hola entro al then")
      
      dispatch({type:GET_TEAM_USER,payload:res.data})
    
    })
      
      .catch (e=>
        console.log(e)
      ) 
  }
  // return (dispatch) => {
  //   axios
  //   .get(`/team/getTeamUser/${email}`)
  //   .then((res) => {
  //       dispatch({
  //         type: GET_TEAM_USER,
  //         payload: res.data,
  //       });
  //     })
  //     .catch((e) => console.log(e));
  // };
}
