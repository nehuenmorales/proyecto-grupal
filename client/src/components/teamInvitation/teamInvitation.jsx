import React, { useEffect } from "react";
import VerticalNavBar from "../VerticalNavbar/VerticalNavbar";
import { useDispatch } from "react-redux";
import { getTeam } from "../../redux/Teams/teamsActions";
import { useSelector } from "react-redux";
import Card from 'react-bootstrap/Card';
import DefaultImage from "../../utils/TeamsFutbolbasic.jpg"
import s from './invitation.module.css'
import {
    Center,
    Flex,
    SimpleGrid,
    Box
} from "@chakra-ui/react"
import axios from "axios";



export default function TeamInvitation({ email, match }) {
    const id = match.params.id
    const dispatch = useDispatch()


    const team = useSelector(state => state.teamsReducer.team);


    useEffect(() => {
        dispatch(getTeam(id));
    }, []);

    const aceptarInvitacion = () => {
        axios.post(`https://falta-uno-1.herokuapp.com/team/aceptInvitation?id=${id}&email=${email}`)
        window.location.href = 'https://falta-uno.vercel.app/'
    }

    const volver = () => {
        window.location.href = 'https://falta-uno.vercel.app/'
    }

    return (
        <Flex>
            <VerticalNavBar />
            {team.name ?

                <div className={s.doscrad}>
                    <Flex>
                        <Card className={s.separar}>
                            <Card.Body className={s.bodyCard}>
                                <Card.Title className={s.title}>Fuiste invitado a ser parte del equipo: {team.name}</Card.Title>
                                <div className={s.contenedorDeTodo}>
                                    <h4 className={s.puntos}>¿Quieres aceptar la invitacion?</h4>
                                </div>
                                <div className={s.bottons}>
                                    <div >
                                        <button onClick={volver} className="btn btn-primary" variant="secondary">
                                            No aceptar
                                        </button>
                                    </div>
                                    <div className={s.aceptar}>
                                        <button onClick={aceptarInvitacion} className="btn btn-success" style={{ color: 'white' }} type="submit">
                                            Aceptar invitacion
                                        </button>
                                    </div>
                                </div>

                            </Card.Body>
                        </Card>
                        <Card className={s.separar2}>
                            <Card.Img variant="top" className={s.NewImage} src={team.image ? team.image : DefaultImage} />
                            <Card.Body className={s.bodyCard}>
                                <Card.Title className={s.title}>{team.name}</Card.Title>
                                <div className={s.contenedorDeTodo}>
                                    <Card.Text className={s.stars}>
                                        {team.rating === 5 ? <h5><i class="fa-solid fa-star" style={{ "color": "gold" }}  ></i><i class="fa-solid fa-star" style={{ "color": "gold" }} ></i><i class="fa-solid fa-star" style={{ "color": "gold" }} ></i><i class="fa-solid fa-star" style={{ "color": "gold" }} ></i><i class="fa-solid fa-star" style={{ "color": "gold" }} ></i></h5>
                                            : team.rating === 4 ? <h5><i class="fa-solid fa-star" style={{ "color": "gold" }} ></i><i class="fa-solid fa-star" style={{ "color": "gold" }} ></i><i class="fa-solid fa-star" style={{ "color": "gold" }} ></i><i class="fa-solid fa-star" style={{ "color": "gold" }} ></i></h5>
                                                : team.rating === 3 ? <h5><i class="fa-solid fa-star" style={{ "color": "gold" }} ></i><i class="fa-solid fa-star" style={{ "color": "gold" }} ></i><i class="fa-solid fa-star" style={{ "color": "gold" }} ></i></h5>
                                                    : team.rating === 2 ? <h5><i class="fa-solid fa-star" style={{ "color": "gold" }} ></i><i class="fa-solid fa-star" style={{ "color": "gold" }} ></i></h5>
                                                        : team.rating === 1 ? <i class="fa-solid fa-star" style={{ "color": "gold" }} ></i> : <h5><i class="fa-solid fa-star" style={{ "color": "gold" }} ></i><i class="fa-solid fa-star" style={{ "color": "gold" }} ></i><i class="fa-solid fa-star" style={{ "color": "gold" }} ></i><i class="fa-solid fa-star" style={{ "color": "gold" }} ></i><i class="fa-solid fa-star" style={{ "color": "gold" }} ></i></h5>}
                                    </Card.Text>
                                    <h5 className={s.puntos}>{team.elo} puntos</h5>
                                </div>

                            </Card.Body>
                        </Card>
                    </Flex>
                </div>
                : null

            }
        </Flex >


    )
}