import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import TableGames from './TableGames';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import VerticalNavbar from '../../VerticalNavbar/VerticalNavbar';
import Table from 'react-bootstrap/Table';


export default function BookedGames() {
    let allGames = useSelector((state) => state.gamesOwnerReducer.allGames)
    console.log(allGames, 'all games')
    const [bookedGames, setBookedGames] = useState([])
    const [freeGames, setFreeGames] = useState([])
    const [select, setSelect] = useState('all')

    // useEffect(() => {
    //     axios.get(`https://falta-uno-1.herokuapp.com/owner/getBookedGamesByOwner/${owner.id}`)
    //         .then(res => {
    //             console.log('res.data', res.data)
    //             for (let i = 0; i < res.data.length; i++) {
    //                 for (let j = 0; j < res.data[i].length; j++) {
    //                     console.log('soy res i j', res.data[i][j])
    //                      let copia = totalGames
    //                      copia.push(res.data[i][j])
    //                     console.log('copia', copia)
    //                         setTotalGames(copia)
    //                 }
    //             }
    //             console.log('soy total games: ', totalGames)
    //         }
    //         );
    // }, [])

    const handleClick = (e) => {
        e.preventDefault()
        let filtrados
        if(e.target.value === 'free'){
            filtrados = allGames.filter(el => {
                return el.status == 'free'
            })
            setSelect('free')
            setFreeGames(filtrados)
            console.log('filtradoss', filtrados)
        } else if(e.target.value === 'booked'){
            filtrados = allGames.filter(el => {
                return el.status == 'booked'
            })
            setSelect('booked')
            setBookedGames(filtrados)
            console.log('filtradoss booked', filtrados)
        } else {
            setSelect('all')
        }
        console.log('selecttttt', select)
    }
    const eliminarTurno = (ev) => {
    }

    return (
        <div>
             <div style={{ 'padding': '10px' , 'display': 'flex','flexDirection':'row', 'justifyContent': 'space-around', 'alignItems':'center' }}>
                <Link to='/' style={{ 'padding': '10px' , 'width': '25%'}}>
                    <Button>Volver</Button>
                </Link>
                <VerticalNavbar/>
            </div>
            <div style={{width: '100%',  display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <select onChange={(e) => handleClick(e)} 
            // style={{padding: '10px 25px', borderRadius: '10px', borderColor: 'white', backgroundColor: '#111825',
            //  color: 'white',  display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '15px'}}
            className='selectSports'
             >
                <option name="all" value='all'>Todos los turnos</option>
                <option name="free" value='free'>Turnos disponibles</option>
                <option name="booked" value='booked'>Turnos reservados</option>
            </select>
            </div>
            <div style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{width: '60%'}}>
            {allGames?.length > 0 && select == 'all' ?
                <Table striped>
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
                        {allGames?.map((elem) => {
                            return (
                                <tr>
                                    <td style={{color:'white'}}>{elem.field.name}</td>
                                    <td style={{color:'white'}}>{elem.date}</td>
                                    <td style={{color:'white'}}>{elem.start}hs</td>
                                    <td style={{color:'white'}}>{elem.end}hs</td>
                                    <td style={{color:'white'}}>{elem.status == 'free' ? 'Libre' : 'Reservada'}</td>
                                </tr>
                            )
                        })}

                    </tbody>
                </Table>
                : select === 'free' && freeGames?.length > 0 ? 
                <Table striped>
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
                        {freeGames?.map((elem) => {
                            return (
                                <tr>
                                    <td style={{color:'white'}}>{elem.field.name}</td>
                                    <td style={{color:'white'}}>{elem.date}</td>
                                    <td style={{color:'white'}}>{elem.start}hs</td>
                                    <td style={{color:'white'}}>{elem.end}hs</td>
                                    <td style={{color:'white'}}>{elem.status == 'free' ? 'Libre' : 'Reservada'}</td>
                                </tr>
                            )
                        })}

                    </tbody>
                </Table>
                : select === 'booked' && bookedGames.length > 0 ?
                <Table striped>
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
                        {bookedGames?.map((elem) => {
                            return (
                                <tr>
                                    <td style={{color:'white'}}>{elem.field.name}</td>
                                    <td style={{color:'white'}}>{elem.date}</td>
                                    <td style={{color:'white'}}>{elem.start}hs</td>
                                    <td style={{color:'white'}}>{elem.end}hs</td>
                                    <td style={{color:'white'}}>{elem.status == 'free' ? 'Libre' : 'Reservada'}</td>

                                </tr>
                            )
                        })}

                    </tbody>
                </Table>
                :
                'Aun no tienes reservas'}
        </div>
        </div>
            {/* {
                 ? 
                <TableGames bookedGames={freeGames} style={{width:'70%'}}/>
                : 
                select === 'booked' ?
                <TableGames bookedGames={bookedGames} style={{width:'70%'}}/>
                : 
                totalGames.length > 0 ?
                <TableGames bookedGames={totalGames} style={{width:'70%'}}/>
                : null
            } */}
        </div>
    )
}