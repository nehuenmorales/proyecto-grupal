import { useAuth0, Auth0Context, User, } from '@auth0/auth0-react';
import React, { useEffect } from 'react'
import { Button, Container, Image, Nav, Navbar, OverlayTrigger, Spinner, Tooltip } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { postPlayer } from '../../redux/PlayerLogin/PlayerLoginActions';


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
          : null
      }

      {
        isAuthenticated ?
          <>
            <Navbar bg="dark" variant="dark" shadow>
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
                       {`${user.name} \n ${user.email}}`}
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
                <Button variant="danger" style={{ "color": "white" }} onClick={() => logout({ returnTo: window.location.origin })}>
                  Salir
                </Button>
              </Container>
            </Navbar>


          </>
          : null
      }

    </div>
  )
}

export default Home;