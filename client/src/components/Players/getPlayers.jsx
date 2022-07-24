import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getPlayers } from '../../redux/Players/GetPlayersAction';
import CardPlayers from './cardPlayers';
import { useEffect } from 'react';

const GetPlayers = () => {
    const dispatch = useDispatch()
    const players = useSelector(state => state.getPlayersReducer.players)

    useEffect(() => {
        dispatch(getPlayers());
    }, [dispatch]);
  return (
    <div>
                {players?.map((x) => {
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
                })}
                
    </div>
   
  )
}

export default GetPlayers