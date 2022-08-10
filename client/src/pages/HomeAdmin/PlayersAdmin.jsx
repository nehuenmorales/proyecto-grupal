import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PlayersAdmin.css'
import { Accordion } from 'react-bootstrap'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { useAuth0 } from '@auth0/auth0-react';
import VerticalNavBarAdmin from '../../components/VerticalNavbar/VerticalNavBarAdmin';
import { Flex } from "@chakra-ui/react"
import './PlayersAdmin.css'
import { Link } from 'react-router-dom';
import {Button} from 'react-bootstrap';



const PlayersAdmin = () => {
    const [players, setPlayers] = useState()
    const [cambio, setCambio] = useState()
    const { user, isLoading, logout } = useAuth0();

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
        <div>
             <div style={{  marginLeft:'20px','padding': '10px', 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'flex-start', 'alignItems': 'center' }}>
                <Link to='/' style={{'padding': '10px', 'width': '25%' }}>
                    <Button>Volver</Button>
                </Link>
            </div>
            {/* // <Flex> */}
            {/* <VerticalNavBarAdmin /> */}
            <div className='adminContenedor'>
                <h3 id='administrar' className="fw-normal text-white fst-italic">Administrar jugadores</h3>
                <Accordion defaultActiveKey='0' flush style={{width:'60%', marginTop:'20px'}}>
                    {players?.map((elem, index) => {
                        return (
                            <Accordion.Item className='header' eventKey={index} key={index} >
                                <Accordion.Header className='header'  >
                                    <h5 className='headerAccordion' style={{backgroundColor:'rgba(17, 24, 37, 1)', width:'100%', height:'100%'}}>{elem.username}</h5>
                                </Accordion.Header>
                                <Accordion.Body className='bodyy'  >
                                    <p className='nombre'>{elem.name.charAt(0).toUpperCase() + elem.name.slice(1)} {elem.lastName.charAt(0).toUpperCase() + elem.lastName.slice(1)}</p>
                                    <div className='acomodandoCajitas' >
                                        <div className='izquierdaCajita'>
                                            <p style={{display: 'flex', flexDirection:'row', alignItems:'center', fontSize:'20px'}}><img src='https://cdn-icons-png.flaticon.com/512/2258/2258570.png' className='logo'></img>{elem.email}</p>
                                            <p style={{display: 'flex', flexDirection:'row', alignItems:'center',fontSize:'20px'}}><img src='https://cdn-icons-png.flaticon.com/512/1244/1244579.png' className='logo'></img>{elem.city}</p>
                                        </div>
                                        <div className='derechaCajita'>
                                            <p style={{display: 'flex', flexDirection:'row', alignItems:'center', fontSize:'20px'}}><img src='https://api.iconify.design/ic:round-phone-iphone.svg?color=%23000000' className='logo'></img> {elem.telephone}</p>
                                            <p style={{fontSize:'20px'}}>{elem.elo} puntos</p>
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

            {/* <div className='adminContenedor'>
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
       </div>     */}
            {/* // </Flex> */}
        </div>

    )
}

export default PlayersAdmin;