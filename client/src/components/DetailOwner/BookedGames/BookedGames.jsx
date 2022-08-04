import React, { useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';


export default function BookedGames(){
    let owner = useSelector((state) => state.getOwnerReducer.owner)

    useEffect(()=> {
        const res = axios.get(`https://falta-uno-1.herokuapp.com/owner/getBookedGamesByOwner/${owner.id}`)
        console.log(res.data);
    }, [])

     console.log('booked games owner', owner)

    return(
        <div>
            <h1 style={{color: 'white'}}>Booked Games</h1>
        </div>  
    )
}