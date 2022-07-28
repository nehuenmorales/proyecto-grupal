import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import imageLanding from "../../assets/images/playersLandingPage.png";
import logo from "../../assets/images/logo.png";
import { Button, Col, Container, Image, Navbar, Row } from "react-bootstrap"


const Landing = () => {
  const { loginWithRedirect } = useAuth0();

  const login = async () => {
    await loginWithRedirect();
  }

  // const userToBack = {
  //   name: user?.given_name,
  //   lastName: user?.family_name,
  //   username: user?.nickname,
  //   email: user?.email,
  //   telephone: user?.length > 0 ? user['https://example.com/phone_number'] : "3511",
  //   city: user?.length > 0 ? user['https://example.com/country'] : "cba" 
  // };

  // useEffect( () =>{
  //   dispatch(postPlayer(userToBack));
  //   console.log('entra');
  //   console.log(userToBack);
  // }, [userToBack])

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <Link className="navbar-brand text-decoration-none text-white" to="/">
              <img src={logo} className="img-fluid" width="60" alt="" />
              FaltaUno!
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Button variant="success" style={{ "color": "white" }} onClick={() => login()}>
              Ingresar
            </Button>
            {/* <Button as="input" type="button" style={{ "color": "white" }} variant="success" value="Registrarse" /> */}
            {/* <Button variant="danger" style={{ "color": "white" }} onClick={() => logout({ returnTo: window.location.origin })}>
              Salir
            </Button> */}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="p-4">
        <Row xs={1} md={2}>
          <Col md={5}>
            <Image
              className="img-fluid"
              style={{
                width: "450px",
              }}
              fluid
              src={imageLanding}
              alt="Jugadores de diferentes deportes."
            />
          </Col>
          <Col md={5} className="d-flex justify-content-md-center flex-column align-items-center">
            <h1 className="text-white">
              Llegamos para revolucionar
              el  deporte amateur.
            </h1>
            <p className="text-primary align-self-start">Y llevarlo a otro nivel.</p>
            <Button className="align-self-start text-white" variant="success">Reserva tu cancha!</Button>
          </Col>
        </Row>
      </Container>
      <div className="container">
        <div className="row mt-3">
        </div>
      </div>

    </>
  );
};

export default Landing;
