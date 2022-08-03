import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react';
import { updateGame } from '../../redux/Games/gamesAction';
import { putGame } from '../../redux/GamesIncomplete/gamesIncompleteActions';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import VerticalNavbar from '../VerticalNavbar/VerticalNavbar'

const Success = ({ match }) => {

  const dispatch = useDispatch()
  const id = match.params.id;
  const { user, isLoading } = useAuth0();
  const valores = window.location.search;
  const urlParams = new URLSearchParams(valores);
  let status = urlParams.get('status');

  useEffect(() => {

    if (status === "approved") {
      dispatch(updateGame(id, { status: "booked" }))
      if (!isLoading) {
        dispatch(putGame(id, { email: user.email }));
      }
    } else {
      dispatch(updateGame(id, { status: "free" }))
    }
  }, [dispatch, isLoading]);


  return (
    <Container>
      <VerticalNavbar />
      {
        isLoading ?
          <p>Cargando....</p>
          :
          status === 'approved' 
          ? null
          :null
      }
      <h1 className='text-white'>Tu Cancha fue reservada con exito! :)</h1>
      <Link to='/'>
        <Button >Volver al Inicio</Button>
      </Link>
    </Container>
  )
}

export default Success