import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailIncomplete } from '../../../redux/GamesIncomplete/gamesIncompleteActions';
import s from "./DetailGamesInc.module.css"
//importar useAuth0()

export default function DetailGamesInc({match}) {
    const gameid = match.params.gameid;
    const dispatch = useDispatch();
    const detail = useSelector(state => state.GamesIncompleteReducer.gamesDetail);
// const {user} = useAuth0();
  useEffect(()=>{
      dispatch(getDetailIncomplete(gameid))
    },[dispatch,gameid])

//    function HandleDispatch(){
    
//    }

    return (<div className={s.background}>
        <h3>{detail[0]?.sport}</h3>
        <h3>{detail[0]?.start}</h3>
        <h3>{detail[0]?.end}</h3>
        <h3>{detail[0]?.date}</h3>
        <h3>{detail[0]?.name}</h3>
        <img src={detail[0]?.image} alt="Imagen"></img>
        <h3>{detail[0]?.adress}</h3>
        <h3>{detail[0]?.description}</h3>
        <h3>${detail[0]?.pricePerHour}</h3>
        <h3>players:{detail?.map(g=>g.username).join(",")}</h3>
        <button>Unirse!</button>
    </div>)
}
