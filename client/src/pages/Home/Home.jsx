import { useAuth0, Auth0Context, User, } from '@auth0/auth0-react';
import React, { useEffect } from 'react'
import { Button, Image, Spinner } from 'react-bootstrap';
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
          <Card style={{ width: '18rem' }}>
            <Card.Img style={{ width: '100px' }} variant="top" src={user.picture} />
            <Card.Body>
              <Card.Title>{user.name}</Card.Title>
              <Card.Text>
                {
                  user['https://example.com/country'] +
                  user['https://example.com/phone_number']
                }
              </Card.Text>
              <Button variant="info" style={{ "color": "white" }} onClick={() => saveInDatabase()}>
                SAVE
              </Button>
            </Card.Body>
          </Card>
          : null
      }
      <Button variant="danger" style={{ "color": "white" }} onClick={() => logout({ returnTo: window.location.origin })}>
        Salir
      </Button>
    </div>
  )
}

export default Home;