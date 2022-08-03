import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getPlayers } from '../../redux/Players/GetPlayersAction';
import CardPlayers from './cardPlayers';
import { useEffect } from 'react';
import VerticalNavbar from '../VerticalNavbar/VerticalNavbar';
import Tabs from '../Tabs/Tabs';
import SearchBar from "../SearchBar/SearchBar.jsx"
import { Container, Row } from 'react-bootstrap';

const GetPlayers = ({ match }) => {
  const dispatch = useDispatch()
  const sport = match.params.sport;
  const players = useSelector(state => state.getPlayersReducer.players)
  const playerSearch = useSelector(state => state.getPlayersReducer.playerSearch);

  useEffect(() => {
    dispatch(getPlayers());
  }, [dispatch]);

  return (
    <>
      <VerticalNavbar />
      <SearchBar filtro="jugadores" sport={sport} />
      <Tabs match={match} />
      <Container>
        <h2 className='text-white'>Jugadores</h2>
        <Row style={{
          'display': 'flex',
          'alignItems': 'center',
          'justifyContent': 'center'
        }}>


          {
            playerSearch.length ?
              playerSearch.map((x) => {
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
        </Row>
      </Container>
    </>

  )
}

export default GetPlayers