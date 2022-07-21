import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailIncomplete } from '../../../redux/GamesIncomplete/gamesIncompleteActions';
// import Auth0


export default function DetailGamesInc({match}) {
    const gameid = match.params.gameid;
    const dispatch = useDispatch();
    // const { loginWithRedirect, user, isAuthenticated, isLoading, logout } = useAuth0();
    const detail = useSelector(state => state.GamesIncompleteReducer.gamesDetail);
  
  useEffect(()=>{
      dispatch(getDetailIncomplete(gameid))
    },[dispatch,gameid])
  
    // handleUnirse(username){
    //     dispatch()
    // }

console.log(detail)
    return (
        <div>
            <h3>players:{detail?.map(g=>g.username).join(",")}</h3>
            <h3>{detail[0].date}</h3>
            <h3>{detail[0].adress}</h3>
            <h3>{detail[0].start}</h3>
            <h3>{detail[0].end}</h3>
            {/* <button onClick={()=>handleUnirse(user.username)}>Unirse!</button> */}

            
            

  
        </div>
    )
}


// 
//     "id": 2,
//     "date": "24-01-1998",
//     "sport": "futbol",
//     "status": "booked",
//     "result": null,
//     "link": null,
//     "start": "8",
//     "end": "20",
//     "fieldId": 1,
//     "tournamentId": null,
//     "players": [
//     "ailu",
//     "elias"
//     ]
//     }