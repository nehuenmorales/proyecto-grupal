import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import imageLanding from "../../assets/images/playersLandingPage.png";
import logo from "../../assets/images/logo.png";
import { Button, Container, Navbar } from "react-bootstrap"



const LandingPage = () => {
  const { loginWithRedirect} = useAuth0();

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
              <img src={logo} className="img-fluid" width="60" alt=""/>
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

      <nav className="navbar bg-dark">
        <div className="container d-flex justify-content-between">
          <div>
          </div>
        </div>
      </nav>
      <div className="container">
        <div className="row mt-3">
          <img
            className="img-fluid"
            style={{
              width: "450px",
            }}
            src={imageLanding}
            alt="Jugadores de diferentes deportes."
          />
        </div>
      </div>

    </>
  );
};

export default LandingPage;