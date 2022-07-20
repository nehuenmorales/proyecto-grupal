import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailIncomplete } from '../../../redux/GamesIncomplete/gamesIncompleteActions';



export default function DetailGamesInc() {
  let { gameid } = useParams();
  const dispatch = useDispatch();
  
  
  useEffect(()=>{
      dispatch(getDetailIncomplete(gameid))
    },[dispatch,gameid])
    
    const detail = useSelector(state => state.GamesIncompleteReducer.gamesDetail);
    
 console.log("detail",detail)
    return (<>
        <h1>{detail.name}</h1>
  
    </>)
}

