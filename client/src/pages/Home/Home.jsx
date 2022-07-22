import './Home.css';
import { useAuth0, Auth0Context, User, } from '@auth0/auth0-react';
import React from 'react';
import { Link } from 'react-router-dom'
import { Button, Col, Container, Image, Nav, Navbar, OverlayTrigger, Row, Spinner, Tooltip } from 'react-bootstrap';
import futbolImage from '../../assets/images/futbolImage.png';
import basquetImage from '../../assets/images/basquetImage.png';
import tenisImage from '../../assets/images/tenisImage.png';
import paddleImage from '../../assets/images/paddleImage.png';

const Home = () => {
  const { user, isAuthenticated, isLoading, logout, getAccessTokenSilently } = useAuth0();

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
            <Navbar bg="dark" variant="dark">
              <Container>
                <Navbar.Brand href="#home">FaltaUno!</Navbar.Brand>
                <Nav className="me-auto">
                  <Nav.Link href="#home">Home</Nav.Link>
                </Nav>
                <OverlayTrigger
                  key={"bottom"}
                  placement={"bottom"}
                  overlay={
                    <Tooltip id={`tooltip-${"bottom"}`}>
                      {`${user.name} \n ${user.email}`}
                    </Tooltip>
                  }
                >
                  <Image width="42" style={
                    {
                      "marginRight": "10px",
                      "border": "2px solid white"
                    }
                  } src={user.picture} roundedCircle />

                </OverlayTrigger>
                <Button className='d-flex justify-content-between align-items-center' variant="danger" style={{ "color": "white" }} onClick={() => logout({ returnTo: window.location.origin })}>
                  <img width="20" className='m-1' src="https://img.icons8.com/ios-glyphs/30/FFFFFF/exit.png" />
                  Salir
                </Button>
              </Container>
            </Navbar>
            <Container className='d-flex justify-content-center mt-3'>
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
                  <Link to="/paddle" className='sport-container'>
                    <span className='sport-span'>Paddle</span>
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