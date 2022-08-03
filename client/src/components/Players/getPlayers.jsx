import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getPlayers } from '../../redux/Players/GetPlayersAction';
import CardPlayers from './cardPlayers';
import { useEffect } from 'react';
import VerticalNavbar from '../VerticalNavbar/VerticalNavbar';
import Tabs from '../Tabs/Tabs';
import SearchBar from "../SearchBar/SearchBar.jsx"

const GetPlayers = ({match}) => {
    const dispatch = useDispatch()
    const sport = match.params.sport;
    const players = useSelector(state => state.getPlayersReducer.players)
    const playerSearch = useSelector(state => state.getPlayersReducer.playerSearch);
    console.log("playerSearch", playerSearch)

    useEffect(() => {
        dispatch(getPlayers());
    }, [dispatch]);
    
  return (
    <div>
        <VerticalNavbar/>
        <SearchBar state={playerSearch} filtro="jugadores" sport={sport} />
        <Tabs match={match}/>
                {
                playerSearch.length?
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
                
    </div>
   
  )
}

export default GetPlayers