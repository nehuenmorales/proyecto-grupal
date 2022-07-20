import { useAuth0 } from '@auth0/auth0-react';
import React from 'react'
import { Button } from 'react-bootstrap';

const Home = () => {
  const { loginWithRedirect, user, isAuthenticated, isLoading, logout } = useAuth0();

  return (
    <div>
      {
        isAuthenticated ?
          <div>
            {user.name}
            <img src={user.picture} />
          </div>
          : <p>No esta autenticado</p>
      }
            <Button variant="danger" style={{ "color": "white" }} onClick={() => logout({ returnTo: window.location.origin })}>
              Logout
            </Button>
    </div>
  )
}

export default Home