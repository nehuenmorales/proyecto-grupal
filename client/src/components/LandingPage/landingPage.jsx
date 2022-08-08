import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import imageLanding from "../../assets/images/playersLandingPage.png";
import logo from "../../assets/images/logo.png";
import { Container, Navbar, Row, Col } from "react-bootstrap"
import { Heading, Button, Flex, Box, Image, Center } from "@chakra-ui/react";


const LandingPage = () => {
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
      <Navbar variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <Link className="navbar-brand text-decoration-none text-white" to="/">
              <img src={logo} className="img-fluid" width="60" alt="" />
              FaltaUno!
            </Link>
          </Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Button bg='#00B83F' onClick={() => login()}>
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
        <Center>
          <Flex>
            <Box>
              <Image
                className="img-fluid"
                style={{
                  width: "450px",
                }}
                fluid
                src={imageLanding}
                alt="Jugadores de diferentes deportes."
              />
            </Box>
            <Box width='500px' margin='120px'>
              <Heading color='white'>Llegamos para revolucionar
                el  deporte amateur.</Heading>
              <p className="text-primary">Y llevarlo a otro nivel.</p>
              <Button bg='#00B83F' _hover={{
                bg: '#00B82f'
              }} variant='solid'>
                Reserva tu cancha!
              </Button>
            </Box>
          </Flex>
        </Center>
      </Container>
    </>
  );
};

export default LandingPage;