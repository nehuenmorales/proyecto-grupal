import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailIncomplete } from '../../../redux/GamesIncomplete/gamesIncompleteActions';



export default function DetailGamesInc() {
  let { id } = useParams();
  const dispatch = useDispatch();
  

  useEffect(()=>{
      dispatch(getDetailIncomplete(id))
    },[dispatch,id])
    
    const detail = useSelector(state => state.GamesIncompleteReducer.DetailGamesInc);
 
    return (<>
        <h1>{detail.name}</h1>
  
    </>)
}

