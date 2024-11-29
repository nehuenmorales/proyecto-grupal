import "../../../pages/DetailComplex/DetailComplex.css";
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row, Carousel, Button } from 'react-bootstrap';
import { getFieldById } from "../../../redux/DetailField/DetailField-action";
import VerticalNavbar from '../../VerticalNavbar/VerticalNavbar';
import Map from '../../Map/Map';
import { BiMapPin } from 'react-icons/bi';
import { Flex, Select } from "@chakra-ui/react"
import { useHistory } from 'react-router-dom';
import { TimeIcon } from "@chakra-ui/icons"
import Modal from "./Modal.jsx"
import { Link } from "react-router-dom";
import { getPlayersProfile } from "../../../redux/Players/GetPlayersAction";
import { useAuth0 } from '@auth0/auth0-react';


const FieldById = ({ match }) => {

  const id = match.params.id;
  const dispatch = useDispatch();
  const detail = useSelector(state => state.getFieldsR.detailFields);
  const field = useSelector((state) => state.getFieldsR.fields)
  const [showModal, setShowModal] = useState(false)
  const history = useHistory();

  const { user, isAuthenticated, isLoading } = useAuth0();
  const player = useSelector((state) => state.getPlayersReducer.playerProfile);

  useEffect(() => {
    dispatch(getPlayersProfile(user?.email));
  }, [])

 

  useEffect(() => {
    dispatch(getFieldById(id))
  }, [dispatch, id])

  function HandleSelect(e) {
    e.preventDefault(e)
    history.push(`/games/detail/${e.target.value}`)
  }

  const handleModal = (e) => {
    e.preventDefault();
    setShowModal(true);
  }

  console.log(detail)
  return (
    <Flex>
      <VerticalNavbar />
      <Container style={{ color: 'white' }}>
        <Link to='/' className="botonVolver">
          <Button  style={{marginTop:'10px'}}>Volver</Button>
        </Link>
        <Carousel className='imageContainer'>
          {/* <Carousel.Item className='imageItemContainer'>
            <img
              className="d-block w-100"
              src={field[0]?.image}
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item> */}
          <Carousel.Item className='imageItemContainer'>
            <img
              className="d-block w-100"
              src="https://donpotrero.com/img/posts/2/medidas_lg.jpg"
              alt="Second slide"
            />

            {/* <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption> */}
          </Carousel.Item>
          {/* <Carousel.Item className='imageItemContainer'>
            <img
              className="d-block w-100"
              src="https://donpotrero.com/img/posts/2/medidas_lg.jpg"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item> */}
        </Carousel>
        {/* <div style={{width:'100%', height:'200px'}}> <img style={{width:'100%', height:'100%'}}src={field[0]?.image} alt="" /> </div> */}
        <Row className='informationContainer'>
          <Col width={20}>
            <Flex mb={4} style={{ marginTop: '15px' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h3 className="complexName" style={{ fontSize: '30px', marginLeft: '5px' }}> <i>{detail[0]?.name}</i> </h3>
                <h3 className="fieldName" style={{ marginLeft: '5px' }}>{detail[0]?.complexname}</h3>
              </div>
            </Flex>
            <Map zoom={16} center={{ lat: detail[0]?.lat, lng: detail[0]?.lng }} margin='0 0 10px 0' />
            <div className='locationInformation'>
              <BiMapPin color='#128DFF' />
              <p>{detail[0]?.address}</p>
            </div>
          </Col>
          <Col>
            <h3 className='titleDescription' style={{ marginTop: '25px', fontSize: '25px', fontWeight: '500' }}>Descripción de la cancha</h3>
            <p style={{ marginTop: '20px', fontSize: '22px', fontWeight: '100' }}>{detail[0]?.description}</p>
            <Flex ml={0}>
              <h3 className="price" style={{ marginTop: '45px', fontSize: '25px' }}>${detail[0]?.pricePerTurn}</h3>
              <p style={{ marginTop: '45px', fontSize: '20px', fontWeight: '100' }}>por turno</p>
            </Flex>
            {
              player?.status === 'banned' ?
            <Button style={{backgroundColor: 'rgba(170, 170, 170)', width: '500px', marginTop: '70px' }} onClick={(e) => { handleModal(e) }} className='text-white ' variant='success' size='lg'disabled>Tu usuario tiene restringida esta acción <img style={{filter:'invert(100%)', width:'20px', marginLeft:'5px'}} src="https://api.iconify.design/emojione-monotone:prohibited.svg?color=%23000000" alt="" /></Button>
              :
            <Button style={{ backgroundColor: 'rgba(0, 184, 62, 1)', width: '500px', marginTop: '70px' }} onClick={(e) => { handleModal(e) }} className='text-white ' variant='success' size='lg'>Turnos Disponibles  <TimeIcon /></Button>
            }
            <Modal
              showModal={showModal}
              setShowModal={setShowModal}
              detail={detail}
            />
          </Col>
        </Row>
      </Container>
    </Flex>
  )
}

export default FieldById;