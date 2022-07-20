import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailIncomplete } from '../../../redux/GamesIncomplete/gamesIncompleteActions';



export default function DetailGamesInc({match}) {
    const gameid = match.params.gameid;
    const dispatch = useDispatch();
    const detail = useSelector(state => state.GamesIncompleteReducer.gamesDetail);
  
  useEffect(()=>{
      dispatch(getDetailIncomplete(gameid))
    },[dispatch,gameid])
  

    return (<div>
        <h3>{detail.sport}</h3>
        <h3>{detail.start}</h3>
        <h3>{detail.end}</h3>
        <h3>{detail.date}</h3>
        <h3>{detail.players}</h3>

  
    </div>)
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