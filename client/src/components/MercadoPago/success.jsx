import React,{useEffect} from 'react';
import { useDispatch } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react';
import { updateGame } from '../../redux/Games/gamesAction';
import { putGame } from '../../redux/GamesIncomplete/gamesIncompleteActions';



const Success = ({match}) => {
    
    const dispatch = useDispatch()
    const id = match.params.id;
    const {user} = useAuth0();
    const valores = window.location.search
    console.log(valores)
    const urlParams = new URLSearchParams(valores);
    let status = urlParams.get('status');
    console.log(status)
    console.log(id,"id")
    console.log(user.email)

    useEffect(() => {
        if(status==="approved"){
            dispatch(updateGame(id, {status:"booked"}))
            dispatch(putGame(id, { email: user.email }));
        }else{
            dispatch(updateGame(id, {status:"free"})) 
        }
        
        console.log("entro")
    }, [dispatch]);


  return (
    <div>
    {/* <VerticalNavbar/> */}
    <h1>Tu Cancha fue reservada con exito!</h1>
    </div>
  )
}

export default Success