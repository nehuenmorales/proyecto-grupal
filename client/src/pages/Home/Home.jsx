import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { Link } from 'react-router-dom'
import { Col, Container, Image, Row, Spinner } from 'react-bootstrap';
import futbolImage from '../../assets/images/futbolImage.png';
import basquetImage from '../../assets/images/basquetImage.png';
import tenisImage from '../../assets/images/tenisImage.png';
import paddleImage from '../../assets/images/paddleImage.png';
import VerticalNavbar from '../../components/VerticalNavbar/VerticalNavbar';
import {
  Flex, Box
} from "@chakra-ui/react"
import './Home.css';
import logo from "../../assets/images/logo.png";
import ProductsCarousel from '../../components/ProductsCarousel/ProductsCarousel'; 



const Home = () => {
  const { user, isAuthenticated } = useAuth0();


  return (
    <Flex>
      <VerticalNavbar />

      {
        isAuthenticated ?
          <>
            <Container className='d-flex justify-content-center aling-items-center mt-3'>
              <div style={{display:"flex",flexDirection:"column"}}>
              <Row>
                <div>
                  <div className="navbar-brand text-decoration-none text-white" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', margin: '0px' }}>
                    <i style={{ fontSize:'25px'}}>FaltaUno!</i>
                    <img src={logo} className="img-fluid" width="70" alt="" />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', margin: '0px' }}>
                    <p className="texttt" style={{marginBottom: '25px', marginLeft: '40px'}} >Elegí un deporte, vas a poder ver a los mejores de tu zona, desafiarlos y alquilar canchas!</p>
                  </div>
                </div>
                <Col md={3} xs={12} sm={6} lg={3}>
                  <Link to="/sport/futbol" className='sport-container'>
                    <span className='sport-spannn' >Futbol</span>
                    <Image rounded src={futbolImage} />
                  </Link>
                </Col>
                <Col className='sport-container-basquet'>
                  <Link to="/sport/basquet" >
                    <span className='sport-spannn' style={{ marginLeft: '15px' }}>Basquet</span>
                    <Image style={{ borderRadius: '20px' }} src={basquetImage} />
                  </Link>
                </Col>
                <Col md={3} xs={12} sm={6} lg={3}>
                  <Link to="/sport/tenis" className='sport-container'>
                    <span className='sport-spannn' >Tenis</span>
                    <Image rounded src={tenisImage} />
                  </Link>
                </Col>
                <Col md={3} xs={12} sm={6} lg={3}>
                  <Link to="/sport/padel" className='sport-container'>
                    <span className='sport-spannn'>Padel</span>
                    <Image rounded src={paddleImage} />
                  </Link>
                </Col>
              </Row>
            <ProductsCarousel/>
            </div>
            </Container>

          </>
          : null
      }

    </Flex>
  )
}

export default Home;