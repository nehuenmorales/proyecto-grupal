import "../Home/Home.css";
import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { Link } from 'react-router-dom'
import { Col, Container, Image, Row, Spinner } from 'react-bootstrap';
import futbolImage from '../../assets/images/futbolImage.png';
import basquetImage from '../../assets/images/basquetImage.png';
import tenisImage from '../../assets/images/tenisImage.png';
import paddleImage from '../../assets/images/paddleImage.png';
import VerticalNavBarAdmin from "../../components/VerticalNavbar/VerticalNavBarAdmin";
import {
    Flex,
    Center
} from "@chakra-ui/react"




const HomeAdmin = () => {

    return (
        <Flex>
            <VerticalNavBarAdmin />
            <>
                <Container display='flex' flexWrap='wrap' className='d-flex justify-content-center aling-items-center mt-3' >

                    <Row >
                        <Center>
                            <Flex justifyContent="space-between" >
                                <Col style={{margin:'25px', width:'320px'}}  >
                                    <Link to="/admin/players" className='sport-container'>
                                        <span className='sport-span' style={{marginLeft:'-40px'}} >Jugadores</span>
                                        <Image style={{width:'320px'}}rounded src="https://images.unsplash.com/photo-1516116086952-6d7ca4587a84?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" />
                                    </Link>
                                </Col>
                                <Col style={{margin:'25px', width:'320px'}} >
                                    <Link to="/admin/sponsors" className='sport-container'>
                                        <span className='sport-span' style={{marginLeft:'-40px'}} >Sponsors</span>
                                        <Image style={{width:'320px'}} rounded src="https://images.unsplash.com/photo-1569597773147-690dfdc3bb4c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" />
                                    </Link>
                                </Col>
                                <Col style={{margin:'25px', width:'320px'}} >
                                    <Link to="/admin/productos" className='sport-container'>
                                        <span className='sport-span' style={{marginLeft:'-40px'}}>Productos</span>
                                        <Image style={{width:'320px'}} rounded src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80" />
                                    </Link>
                                </Col>
                            </Flex>
                        </Center>
                    </Row>
                </Container>

            </>
        </Flex>

    )
}

export default HomeAdmin;