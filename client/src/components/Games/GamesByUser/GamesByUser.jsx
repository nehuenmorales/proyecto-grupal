import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import VerticalNavbar from '../../VerticalNavbar/VerticalNavbar';
import { gamesByUser } from '../../../redux/NuevoGames/gamesAction';
import { Button, Flex } from '@chakra-ui/react';
import Table from 'react-bootstrap/Table';
import { useAuth0 } from '@auth0/auth0-react';
import ModalRating from './ModalRating';


export default function GamesByUser(){
    let allGames = useSelector(state => state.games.gamesUser)
    const dispatch = useDispatch()
    const { user } = useAuth0();
    // const email = user.email
    // console.log(user, "es el usuario")
    // console.log(email, "el el mail")
    console.log(user?.email)
    console.log(allGames, "estos son sus games")
    const [showModal, setShowModal] = useState(false);
    const [complex, setComplex] = useState("");
 
    useEffect(() => {
        dispatch(gamesByUser(user?.email))
    },[dispatch, user?.email])

    const Rating=(e)=>{
        setComplex(e.target.value)
        setShowModal(true)
    }

    return (
        <Flex>
        <VerticalNavbar/>
        <Table striped bordered hover variant="dark">
        <thead>
            <tr>
                <th style={{color:'white'}}>Cancha</th>
                <th style={{color:'white'}}>Día</th>
                <th style={{color:'white'}}>Inicio</th>
                <th style={{color:'white'}}>Final</th>
                <th style={{color:'white'}}>Privacidad</th>
                <th style={{color:'white'}}>Resultado</th>
                <th style={{color:'white'}}></th>

            </tr>
        </thead>
        <tbody>
        {allGames?.data?.map((elem) => {
            return (
                <tr>
                    {/* <td style={{color:'white'}}>{elem.field.name}</td> */}

                    <td style={{color:'white'}}>{elem.fieldname}</td>
                    <td style={{color:'white'}}>{elem.date}</td>
                    <td style={{color:'white'}}>{elem.start}hs</td>
                    <td style={{color:'white'}}>{elem.end}hs</td>
                    <td style={{color:'white'}}>{elem.privacy}</td>
                    <td style={{color:'white'}}>{elem.result === null ? "Sin Resultado" : elem.result}</td>
                    <td><Button style={{backgroundColor:'rgba(0, 184, 63, 1)', marginLeft: '10px'}} value={elem.complexid} onClick={(e)=>Rating(e)}>Calificá tu experiencia</Button></td>

                </tr>
            )
        })}
        </tbody>
        </Table>
            <ModalRating
                showModal={showModal}
                setShowModal={setShowModal}
                complex={complex}
            />
        </Flex>
    )
}