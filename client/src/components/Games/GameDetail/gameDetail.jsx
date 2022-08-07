import React, { useEffect ,useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VerticalNavbar from '../../VerticalNavbar/VerticalNavbar';
import { getGamesById } from '../../../redux/NuevoGames/gamesAction';
import ModalGames from '../ModalGames/modalGames';
import { getSupplies } from '../../../redux/OwnerSupplies/suppliesActions';
import { useAuth0 } from '@auth0/auth0-react';

export default function GameDetail({match}) {
  
  const gameid = match.params.id;
  const dispatch = useDispatch();
  const detail = useSelector(state => state.games.gameDetail);
  const supplies = useSelector(state => state.suppliesReducer.supplies) 
  const [showModal, setShowModal] = useState(false)
    
console.log(detail)

  useEffect(()=>{
      dispatch(getGamesById(gameid))
    },[dispatch,gameid])
    
    
    const handleModal = (e) => {
      e.preventDefault();
      setShowModal(true)
      dispatch(getSupplies(gameid,detail[0]?.sport))
        // dispatch(getSupplies(gameid,detail[0]?.sport))
      }

    return (
    <div>
        <VerticalNavbar/>
        <p>{detail[0]?.complexname}</p>
        <p>{detail[0]?.name}</p>
        <p>{detail[0]?.sport}</p>
        <img src={detail[0]?.image}></img>
        <p>{detail[0]?.date}</p>
        <p>{detail[0]?.start}</p>
        <p>{detail[0]?.end}</p>
        <p>{detail[0]?.pricePerTurn}</p>
        <p>{detail[0]?.adress}</p>
        <p>{detail[0]?.city}</p>
        <button onClick={(e)=>{handleModal(e)}}>Reservar</button>
        <ModalGames
        showModal={showModal}
        setShowModal={setShowModal}
        sport={detail[0]?.sport}
        id={gameid}
        price={detail[0]?.pricePerTurn}
        supplies={supplies}
        />
    </div>)
}

