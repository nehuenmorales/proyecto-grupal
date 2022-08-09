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
                <Container className='d-flex justify-content-center aling-items-center mt-3'>

                    <Row>
                        <Center>
                            <Flex justifyContent="space-around">
                                <Col md={3} xs={12} sm={6} lg={3} >
                                    <Link to="/admin/players" className='sport-container'>
                                        <span className='sport-span' >Jugadores</span>
                                        <Image rounded src="https://images.pexels.com/photos/1198172/pexels-photo-1198172.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
                                    </Link>
                                </Col>
                                <Col md={3} xs={12} sm={6} lg={3} >
                                    <Link to="/admin/sponsors" className='sport-container'>
                                        <span className='sport-span'>Sponsors</span>
                                        <Image rounded src="https://img.freepik.com/foto-gratis/hombre-negocios-dandose-mano-cliente_1098-3378.jpg?w=360&t=st=1659920430~exp=1659921030~hmac=3f52ded9cf72d4ee1b810f9670aa3d061c8396f59f84e147fd4a66a20b4aa1a4https://img.freepik.com/foto-gratis/primer-plano-ejecutivo-sujetando-boligrafo_1098-3657.jpg?w=360&t=st=1659920512~exp=1659921112~hmac=413eac3802cc4e8a5d8ae724ff67118860291b5cf9667cf89ddb2f4f58e70cbd" />
                                    </Link>
                                </Col>
                                <Col md={3} xs={12} sm={6} lg={3} >
                                    <Link to="/admin/productos" className='sport-container'>
                                        <span className='sport-span'>Productos</span>
                                        <Image rounded src="https://images.unsplash.com/photo-1556906781-9a412961c28c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" />
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