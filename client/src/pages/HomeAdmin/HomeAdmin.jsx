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
    const [players, setPlayers] = useState()
    const [cambio, setCambio] = useState()
    const { user, isLoading, logout } = useAuth0();

    useEffect(() => {
        axios.get(`/player/getPlayers`)
            .then(res => setPlayers(res.data))
    }, [])

    useEffect(() => {
        axios.get(`/player/getPlayers`)
            .then(res => setPlayers(res.data))
    }, [cambio])

    const onClick = async (ev) => {
        await axios.put(`/player/modifyStatus/${ev.target.value}`, { status: 'banned' })
        //setCambio(ev.target.value)
        window.location.reload(true)
    }
    const onClickDesbloquear = async (ev) => {
        await axios.put(`/player/modifyStatus/${ev.target.value}`, { status: 'allowed' })
        //setCambio(ev.target.value)
        window.location.reload(true)
    }



    return (
        <div className='adminContenedor'>
            <Button className='d-flex justify-content-between align-items-center' variant="danger" style={{ "color": "white" }} onClick={() => logout({ returnTo: window.location.origin })}>
                <img width="20" className='m-1' src="https://img.icons8.com/ios-glyphs/30/FFFFFF/exit.png" alt='foto' />
            </Button>
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

    )
}

export default HomeAdmin;