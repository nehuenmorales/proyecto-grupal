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
    const [select, setSelect] = useState('')

    console.log('soy total games: ', totalGames)
    // const [bookedGame, setBookedGame] = useState({
    //     date: "",
    //     end: "",
    //     fieldId: '',
    //     id: '',
    //     link: '',
    //     privacy: "",
    //     requirements: '',
    //     result: '',
    //     sport: "",
    //     start: "",
    //     status: "",
    //     tournamentId: '',
    //     type: ""
    // })

    useEffect(() => {
        axios.get(`https://falta-uno-1.herokuapp.com/owner/getBookedGamesByOwner/${owner.id}`)
            .then(res => {
                for (let i = 0; i < res.data.length; i++) {
                    for (let j = 0; j < res.data[i].length; j++) {
                        console.log('soy res i j', res.data[i][j])
                            setTotalGames([...totalGames, res.data[i][j]])
                    }
                }
            });
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
            <select>
                
                <option name="all" onChange={(e) => handleClick(e)}>Todos los turnos</option>
                <option name="free" onChange={(e) => handleClick(e)}>Turnos disponibles</option>
                <option name="booked" onChange={(e) => handleClick(e)}>Turnos reservados</option>
            </select>
            {
                select === 'free' ? 
                <TableGames bookedGames={freeGames} style={{width:'70%'}}/>
                : 
                select === 'booked' ?
                <TableGames bookedGames={bookedGames} style={{width:'70%'}}/>
                : 
                <TableGames bookedGames={totalGames} style={{width:'70%'}}/>

            }
        </div>
    )
}