import React, { useEffect ,useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VerticalNavbar from '../../VerticalNavbar/VerticalNavbar';
import { getGamesById } from '../../../redux/Games/gamesAction';
import ModalGames from '../ModalGames/modalGames';
import { getSupplies } from '../../../redux/OwnerSupplies/suppliesActions';
import { useAuth0 } from '@auth0/auth0-react';
import './gameDetail.css'

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
        <div className='contenedorGameDetail'>
        <img src={detail[0]?.image} className='img'></img>
        <div className='contenedorinfoo'>
        <div className='izquierdaInfo'>
        <p className="fw-normal text-white fst-italic" style={{fontSize: '40px', paddingBottom: '0px', marginBottom: '0px'}}>{detail[0]?.complexname}</p>
        <p className='subtituloCancha'>{detail[0]?.name.charAt(0).toUpperCase() + detail[0]?.name.slice(1)}</p>
        <p className='ciudad'>{detail[0]?.city.charAt(0).toUpperCase() + detail[0]?.city.slice(1)}</p>
        <p className='address'><img src='https://cdn-icons.flaticon.com/png/512/3421/premium/3421853.png?token=exp=1659796347~hmac=550e7f60c26f491522c51d4d6ce59cbc' className='logo'></img> {detail[0]?.address}</p>
        </div>
        <div className='derechaInfo'>
        <p className='canchaDe'>Cancha de {detail[0]?.sport}</p>
        <p className='date'>{detail[0]?.date.charAt(0).toUpperCase() + detail[0]?.date.slice(1)}</p>
        <p className='horario'>de {detail[0]?.start}hs a {detail[0]?.end}hs</p>
        <p><img src='https://cdn-icons-png.flaticon.com/512/74/74742.png' style={{ height: '22px', filter: 'invert(100%)', }}></img>{detail[0]?.pricePerTurn}</p>
        <button onClick={(e)=>{handleModal(e)}} className='botonReservar'>Reservar!</button>
        </div>
        </div>
        <ModalGames
        showModal={showModal}
        setShowModal={setShowModal}
        sport={detail[0]?.sport}
        id={gameid}
        price={detail[0]?.pricePerTurn}
        supplies={supplies}
        />
        </div>
    </div>)
}

