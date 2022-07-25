import './HomeOwner.css';
import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { Link } from 'react-router-dom'
import { Button, Col, Container, Image, Row, Spinner } from 'react-bootstrap';
import complejoImage from '../../assets/images/complejo.jpg';
import basquetImage from '../../assets/images/basquetImage.png';
import tenisImage from '../../assets/images/tenisImage.png';
import paddleImage from '../../assets/images/paddleImage.png';
// import VerticalNavbar from '../../components/VerticalNavbar/VerticalNavbar';
import { useDispatch } from 'react-redux';

const HomeOwner = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();


    return (
        <div>
            {/* {
        isLoading ?
          <Spinner animation="border" variant="light" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          : console.log(user)
      } */}
            {
                // isAuthenticated ?
                <>
                    {/* <VerticalNavbar/> */}
                    <div className='container'>
                            <p className="fw-normal text-white fst-italic m-2">Administrá tus publicaciones</p>
                            <div className='containercards'>
                                    <Link to="/" style={{textDecoration:"none"}}>
                                        <div className='cards' id='complejo'>
                                            <p className='deporte' >COMPLEJO</p>
                                        </div>
                                    </Link>
                                    <Link to="/" style={{textDecoration:"none"}}>
                                        <div className='cards' id='cancha'>
                                            <p className='deporte' >CANCHAS</p>
                                        </div>
                                    </Link>
                                    <Link to="/" style={{textDecoration:"none"}}>
                                        <div className='cards' id='elementos'>
                                            <p className='deporte' >ELEMENTOS</p>
                                        </div>
                                    </Link>
                                    <Link to="/" style={{textDecoration:"none"}}>
                                        <div className='cards' id='reservas'>
                                            <p className='deporte' >RESERVAS</p>
                                        </div>
                                    </Link>
                            </div>
                        </div>
                </>
                //   : null
            }

        </div>
    )
}

export default HomeOwner;