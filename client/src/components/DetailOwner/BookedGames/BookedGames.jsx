import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import TableGames from './TableGames';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import VerticalNavbarCan from '../../VerticalNavbar/VerticalNavBarCan';
import Table from 'react-bootstrap/Table';
import { Flex } from "@chakra-ui/react";
import s from './BookerGames.module.css'


export default function BookedGames() {
    let allGames = useSelector((state) => state.gamesOwnerReducer.allGames)
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
        if (e.target.value === 'free') {
            filtrados = allGames.filter(el => {
                return el.status == 'free'
            })
            setSelect('free')
            setFreeGames(filtrados)
        } else if (e.target.value === 'booked') {
            filtrados = allGames.filter(el => {
                return el.status == 'booked'
            })
            setSelect('booked')
            setBookedGames(filtrados)
        } else {
            setSelect('all')
        }
    }
    const eliminarTurno = (ev) => {
    }

    return (
        <Flex>
            <VerticalNavbarCan />
            {/* <Row> */}
            <div className={s.container}>
                <div style={{ marginLeft: '20px', 'padding': '10px', 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'flex-start', 'alignItems': 'center' }}>
                    <Link to='/' style={{ 'padding': '10px', 'width': '25%' }}>
                        <Button>Volver</Button>
                    </Link>
                </div>
                <h5 className="fw-normal text-white fst-italic m-2" style={{ padding: '30px 0 0px 40px' }}>Mis Turnos</h5>

                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                    <select onChange={(e) => handleClick(e)}
                        style={{ alignItems: 'center', textAlign: 'center', marginBottom: '25px' }}
                        className='selectSports'
                    >
                        <option name="all" value='all'>Todos los turnos</option>
                        <option name="free" value='free'>Turnos disponibles</option>
                        <option name="booked" value='booked'>Turnos reservados</option>
                    </select>
                </div>

                <div style={{ width: '75%', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }} className={s.table}>

                    {allGames?.length > 0 && select == 'all' ?
                        <Table striped>
                            <thead>
                                <tr>
                                    <th style={{ color: 'white' }}>Cancha</th>
                                    <th style={{ color: 'white' }}>Día</th>
                                    <th style={{ color: 'white' }}>Inicio</th>
                                    <th style={{ color: 'white' }}>Final</th>
                                    <th style={{ color: 'white' }}>Estado</th>

                                </tr>
                            </thead>
                            <tbody>
                                {allGames?.map((elem) => {
                                    return (
                                        <tr>
                                            <td style={{ color: 'white' }}>{elem.field.name}</td>
                                            <td style={{ color: 'white' }}>{elem.date}</td>
                                            <td style={{ color: 'white' }}>{elem.start}hs</td>
                                            <td style={{ color: 'white' }}>{elem.end}hs</td>
                                            <td style={{ color: 'white' }}>{elem.status == 'free' ? 'Libre' : 'Reservada'}</td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </Table>
                        : select === 'free' && freeGames?.length > 0 ?
                            <Table striped>
                                <thead>
                                    <tr>
                                        <th style={{ color: 'white' }}>Cancha</th>
                                        <th style={{ color: 'white' }}>Día</th>
                                        <th style={{ color: 'white' }}>Inicio</th>
                                        <th style={{ color: 'white' }}>Final</th>
                                        <th style={{ color: 'white' }}>Estado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {freeGames?.map((elem) => {
                                        return (
                                            <tr>
                                                <td style={{ color: 'white' }}>{elem.field.name}</td>
                                                <td style={{ color: 'white' }}>{elem.date}</td>
                                                <td style={{ color: 'white' }}>{elem.start}hs</td>
                                                <td style={{ color: 'white' }}>{elem.end}hs</td>
                                                <td style={{ color: 'white' }}>{elem.status == 'free' ? 'Libre' : 'Reservada'}</td>
                                            </tr>
                                        )
                                    })}

                                </tbody>
                            </Table>
                            : select === 'booked' && bookedGames.length > 0 ?
                                <Table striped>
                                    <thead>
                                        <tr>
                                            <th style={{ color: 'white' }}>Cancha</th>
                                            <th style={{ color: 'white' }}>Día</th>
                                            <th style={{ color: 'white' }}>Inicio</th>
                                            <th style={{ color: 'white' }}>Final</th>
                                            <th style={{ color: 'white' }}>Estado</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bookedGames?.map((elem) => {
                                            return (
                                                <tr>
                                                    <td style={{ color: 'white' }}>{elem.field.name}</td>
                                                    <td style={{ color: 'white' }}>{elem.date}</td>
                                                    <td style={{ color: 'white' }}>{elem.start}hs</td>
                                                    <td style={{ color: 'white' }}>{elem.end}hs</td>
                                                    <td style={{ color: 'white' }}>{elem.status == 'free' ? 'Libre' : 'Reservada'}</td>

                                                </tr>
                                            )
                                        })}

                                    </tbody>
                                </Table>
                                :
                                <div style={{ width: '100%', color: 'white', display: 'flex', justifyContent: 'center' }}><p style={{ color: 'white' }}>Aún no tienes reservas.</p></div>
                    }

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
                {/* </Row> */}
            </div>
        </Flex>
    )
}