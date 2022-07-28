import { useEffect } from "react"
import { useDispatch,  useSelector } from "react-redux"
import { getPlayersProfile } from "../../redux/Players/GetPlayersAction"
import s from "./profilePage.module.css"

export default function ProfileData({email,user}) {
    const mail=email
    const userAuth0=user
    const dispatch=useDispatch()
    const player = useSelector(state => state.getPlayersReducer.playerProfile);
    console.log("yo soy mail",mail)
    useEffect(()=>{
        dispatch(getPlayersProfile(mail))
    },[dispatch])
    
        return (
         <>
            {player.name?<div >
                <div className={s.container} >
                    <div>
                        <img src={user.picture} className={s.image} alt="Profile Image" />
                    </div>
                <div className={s.info}>                
                    <h2>Nombre: {player.name}</h2>
                    <h2>Apellido: {player.lastName}</h2>
                    <h4>Email: {player.email}</h4>
                    <h4>Telefono: {player.telephone}</h4>
                    <h4>Usuario: {player.username}</h4>
                    <h4>Ciudad: {player.city}</h4>
                    <h4>Elo: {player.elo}</h4>
                </div>

                </div>
            </div>:null}
        </>
        )

    
    
}
