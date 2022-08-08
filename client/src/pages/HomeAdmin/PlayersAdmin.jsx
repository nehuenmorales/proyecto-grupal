import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PlayersAdmin.css'
import { Accordion } from 'react-bootstrap'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Button } from 'react-bootstrap'
import { useAuth0 } from '@auth0/auth0-react';
import VerticalNavBarAdmin from '../../components/VerticalNavbar/VerticalNavBarAdmin';
import {Flex} from "@chakra-ui/react"


const PlayersAdmin = () => {
    const [players, setPlayers] = useState()
    const [cambio, setCambio] = useState()
    const { user, isLoading, logout} = useAuth0();

    useEffect(() => {
        axios.get(`https://falta-uno-1.herokuapp.com/player/getPlayers`)
            .then(res => setPlayers(res.data))
    }, [])

    useEffect(() => {
        axios.get(`https://falta-uno-1.herokuapp.com/player/getPlayers`)
            .then(res => setPlayers(res.data))
    }, [cambio])

    const onClick = async (ev) => {
        await axios.put(`https://falta-uno-1.herokuapp.com/player/modifyStatus/${ev.target.value}`, { status: 'banned' })
        //setCambio(ev.target.value)
        window.location.reload(true)
    }
    const onClickDesbloquear = async (ev) => {
        await axios.put(`https://falta-uno-1.herokuapp.com/player/modifyStatus/${ev.target.value}`, { status: 'allowed' })
        //setCambio(ev.target.value)
        window.location.reload(true)
    }

    

    return (
        <Flex>
            <VerticalNavBarAdmin />
        <div className='adminContenedor'>
            <h3 id='administrar' className="fw-normal text-white fst-italic">Administrar jugadores</h3>
            <Accordion defaultActiveKey='0' flush>
            {players?.map((elem, index) => { 
                return (
                      <Accordion.Item className='header' eventKey={index} key={index}>
                          <Accordion.Header className='header' style={{}}>
                              <h5 className='headerAccordion'>{elem.username}</h5>
                          </Accordion.Header>
                          <Accordion.Body className='bodyy'>
                              <p className='nombre'>{elem.name.charAt(0).toUpperCase() + elem.name.slice(1)} {elem.lastName.charAt(0).toUpperCase() + elem.lastName.slice(1)}</p>
                              <div className='acomodandoCajitas'>
                              <div className='izquierdaCajita'>
                              <p><img src='https://cdn-icons-png.flaticon.com/512/2258/2258570.png' className='logo'></img>{elem.email}</p>
                              <p><img src='https://cdn-icons-png.flaticon.com/512/1244/1244579.png' className='logo'></img>{elem.city}</p>
                              </div>
                              <div className='derechaCajita'>
                              <p><img src='https://cdn-icons-png.flaticon.com/512/597/597177.png' className='logo'></img> {elem.telephone}</p>
                              <p>{elem.elo} puntos</p>
                              </div>
                              </div>
                              <div>
                              {elem.status == 'allowed' ?
                                    <OverlayTrigger
                                        key={"bottom"}
                                        placement={'bottom'}
                                        overlay={
                                        <Tooltip id={`tooltip-${"bottom"}`}>
                                            Bloquear a {elem.name.charAt(0).toUpperCase() + elem.name.slice(1)}
                                        </Tooltip>}>
                                        <button
                                            value={elem.id}
                                            onClick={ev => onClick(ev)} className='botonBloquear'>
                                            Bloquear usuario</button>
                                    </OverlayTrigger>
                                    : <OverlayTrigger
                                        key={"bottom"}
                                        placement={'bottom'}
                                        overlay={
                                            <Tooltip id={`tooltip-${"bottom"}`}>
                                                Desbloquear a {elem.name.charAt(0).toUpperCase() + elem.name.slice(1)}
                                            </Tooltip>}><button value={elem.id} onClick={ev => onClickDesbloquear(ev)} className='botonDesbloquear'>Desbloquear usuario</button></OverlayTrigger>
                                            }
                              </div>
                          </Accordion.Body>
                      </Accordion.Item>
                )
            })}
             </Accordion> 
       </div>    
    </Flex>
        
    )
}

export default PlayersAdmin;