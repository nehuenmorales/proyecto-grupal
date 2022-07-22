import { useAuth0, Auth0Context, User, } from '@auth0/auth0-react';
import React, { useEffect } from 'react'
import { Button, Container, Image, Nav, Navbar, OverlayTrigger, Spinner, Tooltip } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from "react-redux";
import './Home.css';

const Home = () => {
  const dispatch = useDispatch();
  const player = useSelector(state => state.playerLoginReducer.player);

  const { user, isAuthenticated, isLoading, logout, getAccessTokenSilently } = useAuth0();

  const saveInDatabase = () => {
    console.log(user);
  }

  // async function getDetails() {
  //   const token = await getAccessTokenSilently();
  //   const accessToken = token.split(' ')[1];
  //   const respuesta = await axios.get(`https://leogonzalez.us.auth0.com/api/v2/users/${user.sub}`, {
  //     headers: {
  //       "content-type": "application/json; charset=utf-8",
  //       authorization: `Bearer ${accessToken}`
  //     }
  //   });

  //   console.log(respuesta.data)
  // }
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
            <Container>
              <Card style={{ width: '15rem' }}>
                <Card.Img style={{ width: '15rem'}} variant="top" src={user.picture} />
                <Card.Body>
                  <Card.Title>{user.name}</Card.Title>
                  <Card.Text>
                    email: {user.email}<br />
                    Pais: {user['https://example.com/country']}
                    Telefono: {user['https://example.com/phone_number']}
                  </Card.Text>
                  {
                    user['https://example.com/rol'] === "owner" ?
                    <Button variant="dark">
                      Soy owner papa
                    </Button>
                    : null
                  }
                </Card.Body>
              </Card>

            </Container>

          </>
          : null
      }

    </div>
  )
}

export default Home;