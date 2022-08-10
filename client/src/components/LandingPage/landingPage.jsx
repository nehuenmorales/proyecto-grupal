import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import imageLanding from "../../assets/images/playersLandingPage.png";
import logo from "../../assets/images/logo.png";
import { Container, Navbar, Row, Col } from "react-bootstrap"
import { Heading, Button, Flex, Box, Image, Center } from "@chakra-ui/react";


const LandingPage = () => {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

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
    <div >
      <Navbar variant="dark">
        <Container>
          <Navbar.Brand href="#home" style={{ display: 'flex', flexDirection: 'row' }}>

            <Box className="navbar-brand text-decoration-none text-white" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
              <img src={logo} className="img-fluid" width="60" alt="" />
              <i>FaltaUno!</i>
            </Box>
          </Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            {/* <Button bg='#00B83F' onClick={() => login()} style={{ backgroundColor: 'rgba(255, 255, 255, 0)', color: 'white' }}>
              <i>Ingresar</i> 
            </Button> */}
            <Button bg='#00B83F' onClick={() => login()} style={{ color: 'white' }}>
              Registrarse
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
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Box width='500px' marginRight='90px'>
                <Heading color='white'>
                  <p style={{ fontWeight: '700', fontSize: '55px' }}>Reservar</p>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <p style={{ fontWeight: '100', fontSize: '55px', marginRight: '10px' }}>una </p>
                    <p style={{ fontWeight: '700', fontSize: '55px' }}>cancha</p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <p style={{ fontWeight: '100', marginRight: '10px', fontSize: '55px' }}>nunca fue tan</p>
                    <p style={{ fontWeight: '700', fontSize: '55px' }}> fácil.</p>
                  </div>
                </Heading>
                <p className="text-primary" style={{ marginTop: '20px', fontSize:'17px' }}> Decile chau al “falta uno”. </p>
                <div style={{width:'100%', display:'flex', justifyContent:'center'}}>
                  <Button bg='#00B83F' _hover={{
                    bg: '#00B82f'
                  }} variant='solid' style={{ color: 'white', fontSize: '17px', marginTop: '70px', padding: '5px 45px' , marginRight:'30px'}} onClick={() => login()}>
                    Reservá ya!
                  </Button>
                </div>
              </Box>
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
            </div>
          </Flex>
        </Center>
      </Container>
    </div>
  );
};

export default LandingPage;