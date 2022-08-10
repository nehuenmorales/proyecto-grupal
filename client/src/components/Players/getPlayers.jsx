import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getPlayers } from '../../redux/Players/GetPlayersAction';
import CardPlayers from './cardPlayers';
import { useEffect } from 'react';
import VerticalNavbar from '../VerticalNavbar/VerticalNavbar';
import Tabs from '../Tabs/Tabs';
import SearchBar from "../SearchBar/SearchBar.jsx"
import { Container } from 'react-bootstrap';
import { Flex, SimpleGrid, Grid, GridItem } from "@chakra-ui/react"
import s from "./cardPlayers.module.css"

const GetPlayers = ({ match }) => {
  const dispatch = useDispatch();
  const sport = match.params.sport;
  const players = useSelector(state => state.getPlayersReducer.players);
  const playerSearch = useSelector(state => state.getPlayersReducer.playerSearch);

  useEffect(() => {
    dispatch(getPlayers());
  }, [dispatch]);

  return (
    <Flex>
      <VerticalNavbar />
      <Flex flexDir="column" mt="40px">
      <SearchBar filtro="jugadores" sport={sport} />
      <Tabs match={match} />
      <Container>
        <h2 className={s.text}>Jugadores</h2>
        <Grid p='0 2.5em' __css={{ 
          display: 'flex', 
          alignItem: 'center', 
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }} templateColumns='repeat(3, 1fr)' gap={6}>

          {
            playerSearch.length ?
            playerSearch.map((x) => {
                return (
                  <GridItem>
                    <CardPlayers
                      key={x.id}
                      name={x.name}
                      lastName={x.lastName}
                      username={x.username}
                      city={x.city}
                      elo={x.elo}
                    />
                  </GridItem>
                );
              })
              :
              players?.map((x) => {
                return (
                  <CardPlayers
                    key={x.id}
                    name={x.name}
                    lastName={x.lastName}
                    username={x.username}
                    city={x.city}
                    elo={x.elo}
                  />
                );
              })
          }
        </Grid>
      </Container>
                    </Flex>
    </Flex>

  )
}

export default GetPlayers