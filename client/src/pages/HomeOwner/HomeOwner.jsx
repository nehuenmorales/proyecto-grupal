import './HomeOwner.css';
import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Col, Container, Image, Row, Spinner } from 'react-bootstrap';
import cancha from '../../assets/images/cancha.jpg';
import VerticalNavbarCan from '../../components/VerticalNavbar/VerticalNavBarCan';
import { useDispatch } from 'react-redux';
import { getOwner } from '../../redux/GetOwner/getOwnerAction';
import { Flex } from "@chakra-ui/react"
import { getGamesOwner } from '../../redux/OwnerGames/ownerGamesAction';
import { useHistory } from 'react-router-dom';
import logo from "../../assets/images/logo.png";


const HomeOwner = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const dispatch = useDispatch()
  const history = useHistory()


  useEffect(() => {
    console.log(user.email, 'user.email')
    dispatch(getOwner(user.sub))
    console.log('user.sub', user.sub)
    dispatch(getGamesOwner(user.sub))
  }, [user.email])

  return (
    <Flex>
      <VerticalNavbarCan />
      <>
        <Container className='d-flex justify-content-center aling-items-center mt-3'>
          <Row>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
                <div>
                  <div className="navbar-brand text-decoration-none text-white" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginLeft: '15px' }}>
                    <i style={{ fontSize: '25px' }}>FaltaUno!</i>
                    <img src={logo} className="img-fluid" width="70" alt="" />
                  </div>
                </div>
                <div >
                  <Button onClick={() => history.push("/owner/createComplex")} variant="success" className='m-2 text-white' style={{ backgroundColor: 'rgba(0, 184, 62, 1)' }}>Crear complejo</Button>
                  <Button onClick={() => history.push("/owner/select")} variant="success" className='m-2 text-white' style={{ backgroundColor: 'rgba(0, 184, 63, 1)' }}>Crear cancha</Button>
                  <Button onClick={() => history.push("/owner/createSupplie")} variant="success" className='m-2 text-white' style={{ backgroundColor: 'rgba(0, 184, 63, 1)' }}>Crear elemento</Button>
                </div>
              </div>
              <div style={{ width: '100%' }}>
                <p className="text">Administrá tus publicaciones</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', marginTop: '0px', paddingTop: '0px', flexWrap: 'wrap' }}>

                <div style={{ marginTop: '0px', paddingTop: '0px' }}>
                  <Link to="/complexOwner" className='sport-container-owner'>
                    <span className='sport-spann' >Complejos</span>
                    <Image rounded src='https://i.pinimg.com/originals/68/a6/0b/68a60b35ed974546c091a3aa0c1f5dac.jpg' />
                  </Link>
                </div>
                <div style={{ marginTop: '0px', paddingTop: '0px' }}>
                  <Link to="/fieldOwner" className='sport-container-owner'>
                    <span className='sport-spann'>Canchas</span>
                    <Image rounded src={cancha} />
                  </Link>
                </div>
                <div style={{ marginTop: '0px', paddingTop: '0px' }}>
                  <Link to="/suppliesOwner" className='sport-container-owner'>
                    <span className='sport-spann'>Elementos</span>
                    <Image rounded src='https://images.unsplash.com/photo-1602352853916-fb063e27d851?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHJhcXVldGF8ZW58MHwxfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60' />
                  </Link>
                </div>
                <div style={{ marginTop: '0px', paddingTop: '0px' }}>
                  <Link to="/ownerBookedGames" className='sport-container-owner'>
                    <span className='sport-spann'>Reservas</span>
                    <Image rounded src='https://apuestas.marathonbet.es/wp-content/uploads/2020/03/Calendario-Deportes.jpg' />
                  </Link>
                </div>
              </div>
            </div>


          </Row>
        </Container>
      </>


    </Flex>
  )
}

export default HomeOwner;
