import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { Link } from 'react-router-dom'
import {Col, Container, Image, Row, Spinner } from 'react-bootstrap';
import futbolImage from '../../assets/images/futbolImage.png';
import basquetImage from '../../assets/images/basquetImage.png';
import tenisImage from '../../assets/images/tenisImage.png';
import paddleImage from '../../assets/images/paddleImage.png';
import VerticalNavbar from '../../components/VerticalNavbar/VerticalNavbar';
import {
  Flex
}from "@chakra-ui/react"
import './Home.css';


const Home = () => {
  const { user, isAuthenticated } = useAuth0();


  return (
    <Flex>
      <VerticalNavbar/>
      
      {
        isAuthenticated ?
        <>
            <Container className='d-flex justify-content-center aling-items-center mt-3'>
              <Row>
                <p className="text">Elegí un deporte, vas a poder ver a los mejores de tu zona, desafiarlos y alquilar canchas!</p>
                <Col md={3} xs={12} sm={6} lg={3}>
                  <Link to="/sport/futbol" className='sport-container'>                   
                    <span className='sport-span' >Futbol</span>
                    <Image rounded src={futbolImage} />
                  </Link>
                </Col>
                <Col md={3} xs={12} sm={6} lg={3}>
                  <Link to="/sport/basquet" className='sport-container'>
                    <span className='sport-span'>Basquet</span>
                    <Image rounded src={basquetImage} />
                  </Link>
                </Col>
                <Col md={3} xs={12} sm={6} lg={3}>
                  <Link to="/sport/tenis" className='sport-container'>
                    <span className='sport-span'>Tenis</span>
                    <Image rounded src={tenisImage} />
                  </Link>
                </Col>
                <Col md={3} xs={12} sm={6} lg={3}>
                  <Link to="/sport/padel"  className='sport-container'>
                    <span className='sport-span'>Padel</span>
                    <Image rounded src={paddleImage} />
                  </Link>
                </Col>
              </Row>
            </Container>

          </>
          : null
      }

    </Flex>
  )
}

export default Home;