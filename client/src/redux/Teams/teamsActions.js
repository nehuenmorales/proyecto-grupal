import axios from 'axios';

export const CREATE_TEAM = "CREATE_TEAM";


export function getPlayers() {
    return dispatch =>{
      axios.post(`/teams/createTeams`)
        .then(res => {
          dispatch({
            type: CREATE_TEAM,
            payload: res.data
          })
        })
        .catch (e=>
          console.log(e)
        ) 
    }
  }
