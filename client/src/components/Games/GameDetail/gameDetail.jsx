import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VerticalNavbar from '../../VerticalNavbar/VerticalNavbar';
import { getGamesById } from '../../../redux/NuevoGames/gamesAction';
import { getFieldById } from '../../../redux/DetailField/DetailField-action'
import ModalGames from '../ModalGames/modalGames';
import { getSupplies } from '../../../redux/OwnerSupplies/suppliesActions';
import { useAuth0 } from '@auth0/auth0-react';
import { Flex, Heading } from '@chakra-ui/react';
import './gameDetail.css';
import { BiMapPin, BiTimeFive } from 'react-icons/bi';
import Map from '../../Map/Map';
import { Container, Carousel, Button, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import {
  getPlayersProfile,
} from "../../../redux/Players/GetPlayersAction";

export default function GameDetail({ match }) {

  const gameid = match.params.id;
  const dispatch = useDispatch();
  const detail = useSelector(state => state.games.gameDetail);
  const supplies = useSelector(state => state.suppliesReducer.supplies)
  const fieldDetail = useSelector(state => state.getFieldsR.detailFields)
  const [showModal, setShowModal] = useState(false)

  const { user, isAuthenticated, isLoading } = useAuth0();
  const player = useSelector((state) => state.getPlayersReducer.playerProfile);
  console.log(player, "soy player")

  useEffect(() => {
    dispatch(getGamesById(gameid));
    dispatch(getFieldById(detail[0]?.fieldId))
  }, [gameid, detail])

  useEffect(() => {
    dispatch(getPlayersProfile(user?.email));
  }, [])


  const handleModal = (e) => {
    e.preventDefault();
    setShowModal(true)
    dispatch(getSupplies(gameid, detail[0]?.sport))
  }

  return (
    <Flex>
      <VerticalNavbar />
      <Container style={{ color: 'white' }}>
      <Link to='/' className="botonVolver">
            <Button>Volver</Button>
        </Link>
        <Carousel className='imageContainer'>
          <Carousel.Item className='imageItemContainer'>
            <img
              className="d-block w-100"
              src={detail[0]?.image}
              alt="First slide"
            />
          </Carousel.Item>
        </Carousel>
        <Row className='informationContainer mt-3'>
          <Col style={{marginLeft: '40px'}}>
            <Heading as='h1'>{detail[0]?.name}</Heading>
            <p className='mb-2'>Ubicación del complejo</p>
            <Map zoom={16} margin='0 0 10px 0'
              center={{
                lat: fieldDetail[0]?.lat,
                lng: fieldDetail[0]?.lng,
              }}
            />
            <div className='locationInformation'>
              <BiMapPin color='#128DFF' />
              <p>{detail[0]?.address}</p>
            </div>
          </Col>
          <Col>
            <Heading className='titleDescription mb-2' style={{marginTop: '10px', fontSize: '26px'}}>Descripción de la cancha</Heading>
            <p  style={{marginTop: '10px', fontSize: '22px', marginBottom: '10px'}}>{fieldDetail[0]?.description}</p>
            <p className='d-flex align-items-center' style={{marginBottom: '30px', fontWeight: '700'}}>{`De ${detail[0]?.start}hs a ${detail[0]?.end}hs`}<BiTimeFive className='m-2' /></p>
            <Heading  style={{marginBottom: '70px'}}> $ {detail[0]?.pricePerTurn}</Heading>
           {
            player?.status === 'banned' ?
            
            <Button style={{backgroundColor: 'rgba(170, 170, 170)', border: 'none', width: '500px'}} className='d-flex text-white justify-content-center align-items-center' size='lg' disabled>Tu usuario tiene restringida esta acción <img style={{filter:'invert(100%)', width:'20px'}} src="https://api.iconify.design/emojione-monotone:prohibited.svg?color=%23000000" alt="" /> <BiTimeFive className='m-2' /></Button>
            :
            <Button onClick={(e) => { handleModal(e) }} style={{backgroundColor: 'rgba(0, 184, 63, 1)', border: 'none', width: '500px'}} className='d-flex text-white justify-content-center align-items-center' size='lg'>Reservar turno <BiTimeFive className='m-2' /></Button>

           }
          </Col>
        </Row>
        <ModalGames
          showModal={showModal}
          setShowModal={setShowModal}
          sport={detail[0]?.sport}
          id={gameid}
          price={detail[0]?.pricePerTurn}
          supplies={supplies}
        />
      </Container>
      {/* <p>{detail[0]?.complexname}</p>
      <p>{detail[0]?.name}</p>
      <p>{detail[0]?.sport}</p>
      <img src={detail[0]?.image}></img>
      <p>{detail[0]?.date}</p>
      <p>{detail[0]?.start}</p>
      <p>{detail[0]?.end}</p>
      <p>{detail[0]?.pricePerTurn}</p>
      <p>{detail[0]?.adress}</p>
      <p>{detail[0]?.city}</p>
      <button onClick={(e) => { handleModal(e) }}>Reservar</button>
      */}
    </Flex>
  );
}
