import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import VerticalNavbar from '../../VerticalNavbar/VerticalNavbar';
import { gamesByUser } from '../../../redux/NuevoGames/gamesAction';
import { Flex } from '@chakra-ui/react';
import Table from 'react-bootstrap/Table';
import { useAuth0 } from '@auth0/auth0-react';


export default function GamesByUser(){
    let allGames = useSelector((state) => state.games.gamesUser)
    const dispatch = useDispatch()
    const { user } = useAuth0();
    const email = user.email
    console.log(user, "es el usuario")
    console.log(email, "el el mail")

    // useEffect(() => {
    //     dispatch(gamesByUser(email))
    //     console.log(email)
    // })

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
                <th style={{color:'white'}}>Estado</th>
            </tr>
        </thead>
        <tbody>
        {allGames.games?.map((elem) => {
            return (
                <tr>
                    <td style={{color:'white'}}>{elem.field.name}</td>
                    <td style={{color:'white'}}>{elem.date}</td>
                    <td style={{color:'white'}}>{elem.start}hs</td>
                    <td style={{color:'white'}}>{elem.end}hs</td>
                    <td style={{color:'white'}}>{elem.privacy}</td>
                </tr>
            )
        })}
        </tbody>
        </Table>
        </Flex>
    )
}