import React from "react";
import CardGamesInc from "./CardGamesInc";
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux"
import { getGamesIncomplete } from "../../../redux/GamesIncomplete/gamesIncompleteActions";
import s from "./CarouselGamesInc.css"
import VerticalNavbar from "../../VerticalNavbar/VerticalNavbar";
import Tabs from "../../Tabs/Tabs";
import SearchBar from "../../SearchBar/SearchBar";
import {Flex,SimpleGrid,Box} from "@chakra-ui/react"

export default function CarouselGamesInc({match}) {
    const dispatch = useDispatch();
    const sport = match.params.sport;

    useEffect(() => {
        dispatch(getGamesIncomplete());
    },[dispatch]);

    const games = useSelector(state => state.GamesIncompleteReducer.gamesIncomplete)
    const searchGames = useSelector(state => state.GamesIncompleteReducer.gamesSearchIncomplete)

    return (
        <Flex>
        <VerticalNavbar/>
        <Flex flexDir="column" mt="40px">
        <SearchBar filtro="faltauno" sport={sport} />
        <Tabs match={match}/>
        <SimpleGrid columns={3} spacing={12} ml="100px">
                {searchGames.length?
                searchGames?.map((x) => {
                    return (
                        <Box>

                        <CardGamesInc
                            key={x.gameid}
                            name={x.name}
                            sport={x.sport}
                            freeplace={x.freeplace}
                            start={x.starthour}
                            end={x.endhour}
                            gameid={x.gameid}
                            city={x.city}
                            />
                        </Box>
                    );
                })
                :
                games?.map((x) => {
                    return (
                        <Box>

                        <CardGamesInc
                            key={x.gameid}
                            name={x.name}
                            sport={x.sport}
                            freeplace={x.freeplace}
                            start={x.starthour}
                            end={x.endhour}
                            gameid={x.gameid}
                            city={x.city}
                            />
                        </Box>
                            );
                        })}
                
            </SimpleGrid>
            </Flex>
        </Flex>   
    );

};