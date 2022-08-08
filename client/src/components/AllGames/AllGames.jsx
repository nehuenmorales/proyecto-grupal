import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getGameSport } from "../../redux/NuevoGames/gamesAction";
import CardCarousel from "../CardCarousel/CardCarousel.jsx"
import VerticalNavbar from "../VerticalNavbar/VerticalNavbar.jsx";
import { Link } from "react-router-dom";
import Tabs from "../Tabs/Tabs.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx"
import {
    Center,
    Flex,
    SimpleGrid,
    Box
  }from "@chakra-ui/react"
import ProductsCarousel from "../ProductsCarousel/ProductsCarousel";

export default function AllGames({ match }) {

    const sport = match.params.sport;
    const dispatch = useDispatch();
    const games = useSelector(state => state.games.gamesSport);
    const gamesSearch = useSelector(state => state.games.gamesSportSearch);
    const [Page,setPage]=useState(false)
console.log("soy el estado en allgames", gamesSearch)
console.log("soy el estado games en allgames", games)
    
    useEffect(() => {
        dispatch(getGameSport(sport));
    }, [dispatch, sport]);

   

    return (
        <Flex>
            <VerticalNavbar />

            <Flex flexDir="column" mt="40px">
            {
                <>


                        <SearchBar state={gamesSearch} filtro="turnos" setFilter={setPage} sport={sport} />

                        <Tabs match={match} />
                        <ProductsCarousel sport={sport}/>    
                        <p style={{
                            "color": "white",
                            "padding": "0 5em",
                            "marginTop": "10px",
                            "marginBottom": "0",
                            "fontStyle": "italic"
                        }}>Turnos disponibles</p>
                        <SimpleGrid columns={3} spacing={12} ml="100px">
                        {
                            gamesSearch.length?gamesSearch.map( e =>
                                <Box>
                                <CardCarousel key={e.id} item={e} />
                                </Box> 
                            
                            ):games.map(f=>
                                <Box>
                                <CardCarousel key={f.id} item={f} />
                                </Box>
                            )
                        }
                        </SimpleGrid>

                    </>
            }
            </Flex>

        </Flex>
    );

};
