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
console.log(gameid)
  useEffect(()=>{
      dispatch(getDetailIncomplete(gameid))
    },[dispatch,gameid])

//    function HandleDispatch(){
    
//    }

    return (<div className={s.background}>
        <img className={s.image} src={detail[0]?.image} alt="Imagen"></img>
        <div className={s.flex}>
        <h2>{detail[0]?.name}</h2>
        <h4>{detail[0]?.sport}</h4>
        <p>{detail[0]?.date}</p>
        <p>{detail[0]?.start}</p>
        <p>{detail[0]?.end}</p>
        </div>
        <p>{detail[0]?.adress}</p>
        <p>{detail[0]?.description}</p>
        <p>${detail[0]?.pricePerTurn}</p>
        <p>players:{detail?.map(g=>g.username).join(",")}</p>
        <button className={s.button}>Unirse!</button>
    </div>)
}
