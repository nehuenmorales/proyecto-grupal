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
import SearchBar from "../SearchBar/SearchBar.jsx"

export default function AllGames({ match }) {
    const { isLoading } = useAuth0();
    const sport = match.params.sport;
    const dispatch = useDispatch();
    const games = useSelector(state => state.games.gamesSport);
    const gamesSearch = useSelector(state => state.games.gamesSportSearch);

    
    useEffect(() => {
        dispatch(getGameSport(sport));
        
    }, [dispatch, sport]);

    // function searchByName(event) {
    //     setArrayToCarousel(games.filter((item) => item.complex_name === event.target.value))
    // }
   

    return (
        <>
            {
                    <>

                        <VerticalNavbar />

                        <SearchBar filtro="turnos" sport={sport} />


                        <Tabs match={match} />
                        <p style={{
                            "color": "white",
                            "padding": "0 5em",
                            "marginTop": "10px",
                            "marginBottom": "0",
                            "fontStyle": "italic"
                        }}>Turnos disponibles</p>
                        {
                            
                         gamesSearch?
                         <Carousel array={gamesSearch} />
                         : <Carousel array={games} />

                        }
                    </>
            }

        </>
    );

};
