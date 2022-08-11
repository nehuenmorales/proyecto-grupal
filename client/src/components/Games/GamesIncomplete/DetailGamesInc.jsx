import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailIncomplete, putGame } from '../../../redux/GamesIncomplete/gamesIncompleteActions';
import VerticalNavbar from '../../VerticalNavbar/VerticalNavbar';
import { useAuth0 } from '@auth0/auth0-react';
import swal from 'sweetalert';
import { getFieldById } from '../../../redux/DetailField/DetailField-action';
import { Flex, Heading, Divider } from '@chakra-ui/react';
import '../GameDetail/gameDetail.css';
import Map from '../../Map/Map';
import { BiMapPin, BiTimeFive } from 'react-icons/bi';
import { Container, Carousel, Button, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion';
import { getPlayersProfile } from "../../../redux/Players/GetPlayersAction";


export default function DetailGamesInc({ match }) {
  const gameid = match.params.gameid;
  const dispatch = useDispatch();
  const detail = useSelector(state => state.GamesIncompleteReducer.gamesDetail);
  const fieldDetail = useSelector(state => state.getFieldsR.detailFields)
  const { user } = useAuth0();
  const player = useSelector((state) => state.getPlayersReducer.playerProfile);
  useEffect(() => {
    dispatch(getDetailIncomplete(gameid))
    dispatch(getFieldById(detail[0]?.fieldId))
    dispatch(getPlayersProfile(user?.email))
  }, [])

  function HandleDis() {
    dispatch(putGame(gameid, { email: user.email }))
    swal('', `Te uniste Correctamente al juego!`, 'success')
  }

  return (
    <Flex>
      <VerticalNavbar />
      <Container style={{ color: 'white' }}>
        <Link to={`/sport/${detail[0]?.sport}/gamesIncomplete`} className="botonVolver">
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
          <Col style={{ marginLeft: '40px' }}>
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
            <Heading className='titleDescription mb-2' style={{ marginTop: '10px', fontSize: '26px' }}>Descripción de la cancha</Heading>
            <p style={{ marginTop: '10px', fontSize: '22px', marginBottom: '10px' }}>{fieldDetail[0]?.description}</p>
            <p className='d-flex align-items-center' style={{ marginBottom: '15px', fontWeight: '700' }}>{`De ${detail[0]?.start}hs a ${detail[0]?.end}hs`}<BiTimeFive className='m-2' /></p>
            {/* <p className='d-flex align-items-center' style={{marginBottom: '30px', fontWeight: '700'}}>Jugadores anotados:  {detail?.map(g=>g.username).join(", ")}</p> */}
            <Accordion defaultActiveKey="0" style={{ width: "200px", marginBottom: "40px", fontSize: "25px" }}>
              <Accordion.Item eventKey="0">
                <Accordion.Header style={{ fontSize: "30px" }}>Participantes</Accordion.Header>
                <Accordion.Body style={{ display: "flex", alignItems: "center", padding: "20px" }}>
                  <ul style={{ listStyle: "none" }}>
                    {detail?.map(g => <><li style={{ fontSize: "17px" }}>{g.username}</li></>)}
                  </ul>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            {
              player?.status === 'banned' ?
                <Button onClick={() => HandleDis()} style={{ backgroundColor: 'rgba(170, 170, 170)', border: 'none', width: '500px' }} className='d-flex text-white justify-content-center align-items-center' size='lg' disabled>Tu usuario tiene restringida esta acción <img style={{filter:'invert(100%)', width:'20px', marginLeft:'5px'}} src="https://api.iconify.design/emojione-monotone:prohibited.svg?color=%23000000" alt="" /></Button>
                :
                <Button onClick={() => HandleDis()} style={{ backgroundColor: 'rgba(0, 184, 63, 1)', border: 'none', width: '500px' }} className='d-flex text-white justify-content-center align-items-center' size='lg'> Unirse! <BiTimeFive className='m-2' /></Button>
            }
          </Col>
        </Row>
      </Container>
    </Flex>
  )
}

