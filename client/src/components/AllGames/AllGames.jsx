import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getGameSport } from "../../redux/Games/gamesAction";
import Carousel from "../Carousel/Carousel.jsx";
import VerticalNavbar from "../VerticalNavbar/VerticalNavbar.jsx";
import Tabs from "../Tabs/Tabs.jsx";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Form, FormGroup, Spinner } from "react-bootstrap";
import style from "./AllGames.module.css";

export default function AllGames({ match }) {
    const { isLoading } = useAuth0();
    const sport = match.params.sport;
    const dispatch = useDispatch();
    const games = useSelector(state => state.games.gamesSport);
    
    useEffect(() => {
        dispatch(getGameSport(sport));
        
    }, [dispatch, sport]);

    // function searchByName(event) {
    //     setArrayToCarousel(games.filter((item) => item.complex_name === event.target.value))
    // }
   

    return (
        <>
            {
                isLoading ?
                    <Spinner animation="border" variant="light" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    :
                    <>

                        <VerticalNavbar />
                        <FormGroup className="d-flex flex-start align-items-center">
                            <Form.Control className={style.input} size="sm" type="text" placeholder="Busca una cancha..." />
                            <Button variant="success" className="m-1 text-white">Buscar</Button>

                        </FormGroup>
                        <Tabs match={match} />
                        <p style={{
                            "color": "white",
                            "padding": "0 5em",
                            "marginTop": "10px",
                            "marginBottom": "0",
                            "fontStyle": "italic"
                        }}>Turnos disponibles</p>
                        <Carousel array={games} />
                    </>
            }

        </>
    );

};
