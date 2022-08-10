import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailIncomplete, putGame } from '../../../redux/GamesIncomplete/gamesIncompleteActions';
import VerticalNavbar from '../../VerticalNavbar/VerticalNavbar';
import s from "./DetailGamesInc.module.css"
import { useAuth0 } from '@auth0/auth0-react';
import swal from 'sweetalert';
import { Flex } from '@chakra-ui/react';

export default function DetailGamesInc({match}) {
    const gameid = match.params.gameid;
    const dispatch = useDispatch();
    const detail = useSelector(state => state.GamesIncompleteReducer.gamesDetail);
    const {user} = useAuth0();
    console.log(detail)
    console.log(gameid,"game id Detail")
    console.log(user.email,"email Detail")
  useEffect(()=>{
      dispatch(getDetailIncomplete(gameid))
    },[dispatch,gameid])

   function HandleDispatch(){
    dispatch(putGame(gameid, { email: user.email }))
    swal('', `Te uniste Correctamente al juego!`, 'success')
   }

    return (
    <Flex>

        <VerticalNavbar/>
    <div className={s.background}>
        <img className={s.image} src={detail[0]?.image} alt="Imagen"></img>
        <div className={s.flex}>
        <h2>{detail[0]?.name}</h2>
        <h4>{detail[0]?.sport}</h4>
        <p>{detail[0]?.date}</p>
        <p>{detail[0]?.start}</p>
        <p>{detail[0]?.end}</p>
        </div>
        <p>{detail[0]?.city}</p>
        <p>{detail[0]?.description}</p>
        <p>${detail[0]?.pricePerTurn}</p>
        <p>players:{detail?.map(g=>g.username).join(",")}</p>
        <button onClick={()=>{HandleDispatch()}} className={s.button}>Unirse!</button>
    </div>
    </Flex>
    )
}

