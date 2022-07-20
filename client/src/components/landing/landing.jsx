import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import imageLanding from "../../assets/images/playersLandingPage.png";
import logo from "../../assets/images/logo.png";
import ModalRegister from "../Modal/ModalRegister";
import { Button, Container, Navbar, Spinner } from "react-bootstrap"

const Landing = () => {
  const { loginWithRedirect, user, isAuthenticated, isLoading, logout } = useAuth0();
  
  const selectRol = () => {

  }


  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <Link className="navbar-brand text-decoration-none text-white" to="/">
              <img src={logo} className="img-fluid" width="60" />
              FaltaUno!
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Button variant="transparent" style={{ "color": "white" }} onClick={() => loginWithRedirect()}>
              Ingresar
            </Button>
            <Button onClick={() => selectRol()} as="input" type="button" style={{ "color": "white" }} variant="success" value="Registrarse" />
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {
        isAuthenticated ? 
        <div>
          {user.name}
          <img src={user.picture}/>
        </div>
        : null
      }
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

export default Landing;
