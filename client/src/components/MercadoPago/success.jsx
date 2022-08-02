import React,{useEffect} from 'react';
import { useDispatch } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react';


const Success = () => {
    
    // const dispatch = useDispatch()
    // // const {user} = useAuth0();
    // // const valores = window.location.search
    // // console.log(valores)
    // // const urlParams = new URLSearchParams(valores);
    
    // useEffect(() => {
    //     // dispatch(putGame(gameid, { email: user.email }));
    //     // dispatch(updateGame(id, {status:"booked"}))
    //     console.log("entro")
    // }, [dispatch]);


  return (
    <div>
    <h1>Tu Cancha fue reservada con exito!</h1>
    </div>
  )
}

export default Success