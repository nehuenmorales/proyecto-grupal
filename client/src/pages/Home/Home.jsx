import './Home.css';
import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { Link } from 'react-router-dom'
import { Button, Col, Container, Image, Row, Spinner } from 'react-bootstrap';
import futbolImage from '../../assets/images/futbolImage.png';
import basquetImage from '../../assets/images/basquetImage.png';
import tenisImage from '../../assets/images/tenisImage.png';
import paddleImage from '../../assets/images/paddleImage.png';
import VerticalNavbar from '../../components/VerticalNavbar/VerticalNavbar';

const Home = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    <div>
      {
        isLoading ?
          <Spinner animation="border" variant="light" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          : console.log(user)
      }
      {
        isAuthenticated ?
          <>
            <VerticalNavbar/>
            <Container className='d-flex justify-content-center aling-items-center mt-3'>
              <Row>
                <p className="fw-normal text-white fst-italic m-2">Elegí un deporte, vas a poder ver a los mejores de tu zona, desafiarlos y alquilar canchas</p>
                <Col>
                  <Link to="/futbol" className='sport-container'>
                    <span className='sport-span'>Futbol</span>
                    <Image rounded src={futbolImage} />
                  </Link>
                </Col>
                <Col>
                  <Link to="/basquet" className='sport-container'>
                    <span className='sport-span'>Basquet</span>
                    <Image rounded src={basquetImage} />
                  </Link>
                </Col>
                <Col>
                  <Link to="/tenis" className='sport-container'>
                    <span className='sport-span'>Tenis</span>
                    <Image rounded src={tenisImage} />
                  </Link>
                </Col>
                <Col>
                  <Link to="/padel" className='sport-container'>
                    <span className='sport-span'>Padel</span>
                    <Image rounded src={paddleImage} />
                  </Link>
                </Col>
              </Row>
            </Container>

          </>
          : null
      }

    </div>
  )
}

export default Home;