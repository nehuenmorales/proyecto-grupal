
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Col, Container, Image, Row, Spinner } from 'react-bootstrap';
import VerticalNavbar from '../../components/VerticalNavbar/VerticalNavbar';
import { useDispatch } from 'react-redux';
import { getOwner } from '../../redux/GetOwner/getOwnerAction';
import axios from 'axios';
import { getGamesOwner } from '../../redux/OwnerGames/ownerGamesAction';
import { getPlayers } from '../../redux/Players/GetPlayersAction';
import { Accordion } from 'react-bootstrap'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';


const HomeAdmin = () => {
    const [players, setPlayers] = useState()
    useEffect(() => {
        axios.get(`https://falta-uno-1.herokuapp.com/player/getPlayers`)
            .then(res => setPlayers(res.data))
    }, [])
    console.log(players)
    const onClick = (ev) => {
        axios.put(`https://falta-uno-1.herokuapp.com/player/modifyStatus/${ev.target.value}`, { status: 'banned' })
    }
    const onClickDesbloquear = (ev) => {
        axios.put(`https://falta-uno-1.herokuapp.com/player/modifyStatus/${ev.target.value}`, { status: 'allowed' })
    }

    const renderTooltip = (name) => (
        <Tooltip id="button-tooltip">
            Bloquear a {name}
        </Tooltip>
    )

    const renderTooltipDesbloquear = (name) => (
        <Tooltip id="button-tooltip">
            Desbloquear a {name.charAt(0).toUpperCase() + name.slice(1)}
        </Tooltip>
    )

    return (
        <div>
            <h3>Administrar Usuarios</h3>
            <Accordion defaultActiveKey='0'>
                {players?.map((elem, index) => {
                    return (
                        <Accordion.Item eventKey={index} key={index}>
                            <Accordion.Header>
                                <h5>{elem.username}</h5>
                            </Accordion.Header>
                            <Accordion.Body>
                                <p>{elem.name.charAt(0).toUpperCase() + elem.name.slice(1)}</p>
                                <p>{elem.lastname}</p>
                                <p>{elem.email}</p>
                                <p>{elem.city}</p>
                                <p>{elem.telephone}</p>
                                <p>{elem.elo}</p>
                                <p>{elem.status}</p>
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
                                            onClick={ev => onClick(ev)}>
                                            Bloquear usuario</button>
                                    </OverlayTrigger>
                                    : <OverlayTrigger
                                        key={"bottom"}
                                        placement={'bottom'}
                                        overlay={
                                            <Tooltip id={`tooltip-${"bottom"}`}>
                                                Desbloquear a {elem.name.charAt(0).toUpperCase() + elem.name.slice(1)}
                                            </Tooltip>}><button value={elem.id} onClick={ev => onClickDesbloquear(ev)}>Desbloquear usuario</button></OverlayTrigger>}

                            </Accordion.Body>
                        </Accordion.Item>
                    )
                })}
            </Accordion>
        </div>
    )
}

export default HomeAdmin;