import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import TableGames from './TableGames';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import VerticalNavbar from '../../VerticalNavbar/VerticalNavbar';


export default function BookedGames() {
    let owner = useSelector((state) => state.getOwnerReducer.owner)
    const [bookedGames, setBookedGames] = useState([])
    const [totalGames, setTotalGames] = useState([])
    const [freeGames, setFreeGames] = useState([])
    const [select, setSelect] = useState('all')

    useEffect(() => {
        axios.get(`https://falta-uno-1.herokuapp.com/owner/getBookedGamesByOwner/${owner.id}`)
            .then(res => {
                console.log('res.data', res.data)
                for (let i = 0; i < res.data.length; i++) {
                    for (let j = 0; j < res.data[i].length; j++) {
                        console.log('soy res i j', res.data[i][j])
                         let copia = totalGames
                         copia.push(res.data[i][j])
                        console.log('copia', copia)
                            setTotalGames(copia)
                    }
                }
                console.log('soy total games: ', totalGames)
            }
            );
    }, [])

    const handleClick = (e) => {
        e.preventDefault()
        let filtrados
        if(e.target.name === 'free'){
            filtrados = totalGames.filter(el => {
                return el.status == 'free'
            })
            setSelect('free')
            setFreeGames(filtrados)
            console.log('filtradoss', filtrados)
        } else if(e.target.name === 'booked'){
            filtrados = totalGames.filter(el => {
                return el.status == 'booked'
            })
            setSelect('booked')
            setBookedGames(filtrados)
            console.log('filtradoss booked', filtrados)
        } else {
            setSelect('all')
        }
    }


    return (
        <div>
             <div style={{ 'padding': '10px' , 'display': 'flex','flexDirection':'row', 'justifyContent': 'space-around', 'alignItems':'center' }}>
                <Link to='/' style={{ 'padding': '10px' , 'width': '25%'}}>
                    <Button>Volver</Button>
                </Link>
                <VerticalNavbar/>
            </div>
            <select onChange={(e) => handleClick(e)}>
                <option name="all" value='all'>Todos los turnos</option>
                <option name="free" value='free'>Turnos disponibles</option>
                <option name="booked" value='booked'>Turnos reservados</option>
            </select>
            {
                select === 'free' &&  totalGames.length > 0 ? 
                <TableGames bookedGames={freeGames} style={{width:'70%'}}/>
                : 
                select === 'booked'&& totalGames.length > 0 ?
                <TableGames bookedGames={bookedGames} style={{width:'70%'}}/>
                : 
                totalGames.length > 0 ?
                <TableGames bookedGames={totalGames} style={{width:'70%'}}/>
                : null
            }
        </div>
    )
}