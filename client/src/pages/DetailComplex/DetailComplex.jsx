import './DetailComplex.css';
import React, { useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux';
import { Col, Container, Row, Carousel, Button } from 'react-bootstrap';
import { getSearchComplex } from '../../redux/Complexes/ComplexAction'
import VerticalNavbar from '../../components/VerticalNavbar/VerticalNavbar';
import Map from '../../components/Map/Map';
import { BiMapPin } from 'react-icons/bi';


const DetailComplex = ({ match }) => {
  // Obtener el detalle del complejo
  const { id, sport } = match.params;
  const dispatch = useDispatch();
  const complex = useSelector(state => state.complexReducer.complexSearch);

  useEffect(() => {
    dispatch(getSearchComplex(id, sport))
  }, [dispatch])

  return (
    <Container style={{ color: 'white' }}>
      <VerticalNavbar />
      <Carousel className='imageContainer'>
        <Carousel.Item className='imageItemContainer'>
          <img
            className="d-block w-100"
            src={complex[0]?.image}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className='imageItemContainer'>
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
        </Carousel.Item>
      </Carousel>
      <Row className='informationContainer'>
        <Col>
          <h1>{complex[0]?.name}</h1>
          <p>Ubicación del complejo</p>
          <Map zoom={16} center={{ lat: complex[0]?.lat, lng: complex[0]?.lng }} margin='0 0 10px 0'/>
          <div className='locationInformation'>
            <BiMapPin color='#128DFF'/>
            <p>{complex[0]?.address}</p>
          </div>
        </Col>
        <Col>
          <h3 className='titleDescription'>Descripción de la cancha</h3>
          <p>{complex[0]?.description}</p>
          <Button className='text-white w-100 m-1' variant='success' size='lg'>Contactanos!</Button>
        </Col>
      </Row>
    </Container>
  )
}

export default DetailComplex;