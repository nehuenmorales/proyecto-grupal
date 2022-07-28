import React from 'react';
import { Navbar, Container, Nav, OverlayTrigger, Tooltip, Image, Button } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import { useHistory } from 'react-router-dom';

const VerticalNavbar = () => {

  const { user, isLoading, logout} = useAuth0();

  const history = useHistory();

  return (

    isLoading ? null :
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">FaltaUno!</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Inicio</Nav.Link>
            {
              user['https://example.com/rol'] === 'owner'
                ?
                <>
                  <Nav.Link href="/panel">Mis Canchas</Nav.Link>
                  <Nav.Link href="/eventos">Mis Eventos</Nav.Link>
                  <Nav.Link href="/perfil">Mi perfil</Nav.Link>
                </>
                :
                <>
                  <Nav.Link href="/equipos">Mis Equipos</Nav.Link>
                  <Nav.Link href="/eventos">Mis Eventos</Nav.Link>
                  <Nav.Link href="/profile">Mi perfil</Nav.Link>
                </>
            }

          </Nav>
          {
            user['https://example.com/rol'] === 'owner' ?
            <>
              <Button onClick={() => history.push("/owner/select")} variant="success" className='m-2 text-white'>Crear cancha</Button>
              <Button onClick={() => history.push("/owner/createComplex")} variant="success" className='m-2 text-white'>Crear complejo</Button>
              <Button onClick={() => history.push("/owner/createSupplie")} variant="success" className='m-2 text-white'>Crear elemento</Button>
              </>: null
          }
          <OverlayTrigger
            key={"bottom"}
            placement={"bottom"}
            overlay={
              <Tooltip id={`tooltip-${"bottom"}`}>
                {`${user.given_name} \n ${user.email}`}
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
            <img width="20" className='m-1' src="https://img.icons8.com/ios-glyphs/30/FFFFFF/exit.png" alt='foto' />
          </Button>
        </Container>
      </Navbar>
  )
}

export default VerticalNavbar