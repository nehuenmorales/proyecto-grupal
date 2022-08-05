import './HomeOwner.css';
import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Col, Container, Image, Row, Spinner } from 'react-bootstrap';
import cancha from '../../assets/images/cancha.jpg';
 import VerticalNavbarCan from '../../components/VerticalNavbar/VerticalNavBarCan';
import { useDispatch } from 'react-redux';
import {getOwner} from '../../redux/GetOwner/getOwnerAction';
import {Flex} from "@chakra-ui/react"

const HomeOwner = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const dispatch = useDispatch()

    useEffect(() => {
        console.log(user.email, 'user.email')
        dispatch(getOwner(user.sub))
        console.log('user.sub', user.sub)
        
    },[user.email])
    
    
    
    return (
        <Flex>
            <VerticalNavbarCan/>
                <>
                    <VerticalNavbar/>
                    <div className='container'>
                            <p className="fw-normal text-white fst-italic m-2">Administrá tus publicaciones</p>
                            <div className='containercards'>
                                    <Link to="/complexOwner" style={{textDecoration:"none"}}>
                                        <div className='cards' id='complejo'>
                                            <p className='deporte' >COMPLEJO</p>
                                        </div>
                                    </Link>
                                    <Link to="/fieldOwner" style={{textDecoration:"none"}}>
                                        <div className='cards' id='cancha1'>
                                            <p className='deporte' >CANCHAS</p>
                                        </div>
                                    </Link>
                                    <Link to="/suppliesOwner" style={{textDecoration:"none"}}>
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
            

        </Flex>
    )
}

export default HomeOwner;
