import './DetailComplex.css';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row, Carousel } from 'react-bootstrap';
import { getSearchComplex } from '../../redux/Complexes/ComplexAction'
import VerticalNavbar from '../../components/VerticalNavbar/VerticalNavbar';
import Map from '../../components/Map/Map';
import { BiMapPin } from 'react-icons/bi';
import { Flex, Button } from "@chakra-ui/react"


const DetailComplex = ({ match }) => {
  // Obtener el detalle del complejo
  const { id, sport } = match.params;
  const dispatch = useDispatch();
  const complex = useSelector(state => state.complexReducer.complexSearch);

  useEffect(() => {
    dispatch(getSearchComplex(id, sport))
  }, [dispatch])
  console.log(sport)
  console.log(complex)

  return (
    <Flex>
      <VerticalNavbar />
      <Container style={{ color: 'white' }}>
        {/* {complex[0]?.sport === 'futbol' ? */}
          < Carousel className='imageContainer'>
        <Carousel.Item className='imageItemContainer'>
          <img
            className="d-block w-100"
            src={complex[0]?.image}
            alt="First slide"
          />
        </Carousel.Item>
      </Carousel>
      {/* : complex[0]?.sport === 'basquet' ?
      < Carousel className='imageContainer'>
        <Carousel.Item className='imageItemContainer'>
          <img
            className="d-block w-100"
            src={complex[0]?.image}
            alt="First slide"
          />
        </Carousel.Item>
      </Carousel>
      : complex[0]?.sport === 'tenis'?
      < Carousel className='imageContainer'>
        <Carousel.Item className='imageItemContainer'>
          <img
            className="d-block w-100"
            src={complex[0]?.image}
            alt="First slide"
          />
        </Carousel.Item>
      </Carousel>
      : 
      < Carousel className='imageContainer'>
        <Carousel.Item className='imageItemContainer'>
          <img
            className="d-block w-100"
            src={complex[0]?.image}
            alt="First slide"
          />
          
        </Carousel.Item>
      </Carousel>

      } */}

      {/* <Carousel.Item className='imageItemContainer'>
          <img
            className="d-block w-100"
            src="https://donpotrero.com/img/posts/2/medidas_lg.jpg"
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className='imageItemContainer'>
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

      <Row className='informationContainer'>
        <Col>
          <h1 className="complexName" style={{ fontSize: '30px', marginLeft: '5px', marginTop: '5px' }}> <i>{complex[0]?.name}</i> </h1>
          <p style={{ fontSize: '20px', fontWeight: '100', margin: '5px' }}>Ubicación del complejo</p>
          <Map zoom={16} center={{ lat: complex[0]?.lat, lng: complex[0]?.lng }} margin='0 0 10px 0' />
          <div className='locationInformation'>
            <BiMapPin color='#128DFF' />
            <p>{complex[0]?.address}</p>
          </div>
        </Col>
        <Col>
          <h3 className='titleDescription' style={{ marginTop: '25px', fontSize: '25px', fontWeight: '500' }}>Descripción del complejo</h3>
          <p style={{ marginTop: '20px', fontSize: '22px', fontWeight: '100', marginBottom: '40px' }}>{complex[0]?.description}</p>
          <Button style={{ marginTop: '40px' }} bg='#00B83F' colorScheme='#00B83F' className='text-white w-100 m-1' size='lg' >Contactanos!</Button>
        </Col>
      </Row>
    </Container>
  </Flex >
  )
}

export default DetailComplex;