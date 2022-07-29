import { useEffect, useState } from "react"
import { useDispatch,  useSelector } from "react-redux"
import { getPlayersProfile, putPlayer } from "../../redux/Players/GetPlayersAction"
import s from "./profilePage.module.css"

export default function ProfileData({email,user}) {
    const mail=email
    const dispatch=useDispatch()
    const [flag,setFlag]=useState(false)
    const player = useSelector(state => state.getPlayersReducer.playerProfile);
    const [buttonedit,setButtonEdit]=useState({name:false,lastName:false,telephone:false,username:false,city:false})
    const [ profile,setChangesToProfile]=useState({
        name: player.name,
        lastName:player.lastName,
        telephone:player.telephone,
        username:player.username,
        city:player.city,
    })
    
    const [errors,setErrors]=useState({
        name: "",
        lastName:"",
        telephone:"",
        username:"",
        
    })
    
    const validador=(e)=>{
        const nameExpresion = /[0-9/'0-9'/,*+._&=():;%$#!|-]/gi;
        const phoneRegularExpresion = /^\d+$/;
        const name =e.target.name
        const value =e.target.value
        console.log("nombre del error",name)
        console.log("valor del error",value)

        if (name === "name" || name === "lastName"){
            if(nameExpresion.test(value)|| !value){
                setErrors({...errors,[name]:"Valor invalido"})
            }else{
                setErrors({...errors,[name]:""})
            }
        }
        if (name === "telephone"){
            if(!phoneRegularExpresion.test(value)){
                setErrors({...errors,[name]:"Valor invalido"})
            }else{
                setErrors({...errors,[name]:""})
            }
        }
        if(name === "username"){
            if(!value){
                setErrors({...errors,[name]:"Valor invalido"})
            }else{
                setErrors({...errors,[name]:""})
            }
        }
           
        console.log(errors)
        }
     
        
        
    useEffect(()=>{
        dispatch(getPlayersProfile(mail))
    },[dispatch])

    useEffect(()=>{
        setChangesToProfile({name: player.name,
            lastName:player.lastName,
            telephone:player.telephone,
            username:player.username,
            city:player.city,
            
        })
    },[player])
    
    const onChange=(e)=>{
        const name=e.target.name
        const value=e.target.value
        setChangesToProfile({...profile,[name]:value})
        setFlag(true)
        console.log("valor",value)
        validador(e)
    }
    
    const editProfile=(value)=>{
        if(buttonedit[value]){
            setButtonEdit({...buttonedit,[value]:false})
        }else{
        setButtonEdit({...buttonedit,[value]:true})
    }
    }

    const onSubmit = (e)=>{
        e.preventDefault()
        dispatch(putPlayer(mail, profile))
        console.log("soy el mail", mail)
        console.log("soy el objeto", profile)
        setFlag(false)
        setButtonEdit({name:false,lastName:false,telephone:false,username:false,city:false})
    }



        return (
         <>
            {player.name?<div >
                <div className={s.container} >
                    <div>
                        <img src={user.picture} className={s.image} alt="Profile Image" />
                    </div>
                <div className={s.info}>                
                    {buttonedit.name?<h6>Nombre: <input name="name" onChange={(e)=> onChange(e)} defaultValue={profile.name} /> <button value="name" onClick={(e)=>editProfile(e.target.value)}>X</button> </h6>
                    :<h6>Nombre: {profile.name} <button value="name" onClick={(e)=>editProfile(e.target.value)}>X</button> </h6>}
                    
                    {errors.name?<h5>{errors.name}</h5>:null}

                    {buttonedit.lastName?<h6>Apellido: <input name="lastName" onChange={(e)=> onChange(e)} defaultValue={profile.lastName}/> <button value="lastName" onClick={(e)=>editProfile(e.target.value)}>X</button> </h6>
                    :<h6>Apellido: {profile.lastName} <button value="lastName" onClick={(e)=>editProfile(e.target.value)}>X</button> </h6>}
                    
                    {errors.lastName?<h5>{errors.lastName}</h5>: null}
                    
                    <h4>Email: {player.email}</h4>
                    
                    {buttonedit.telephone?<h6>Telefono: <input name="telephone" onChange={(e)=> onChange(e)} defaultValue={profile.telephone}/> <button value="telephone" onClick={(e)=>editProfile(e.target.value)}>X</button> </h6>
                    :<h6>Telefono: {profile.telephone} <button value="telephone" onClick={(e)=>editProfile(e.target.value)}>X</button> </h6>}
                    
                    {errors.telephone?<h5>{errors.telephone}</h5>:null}
                    
                    {buttonedit.username?<h6>Nombre de usuario: <input  name="username" onChange={(e)=> onChange(e)} defaultValue={profile.username}/> <button value="username" onClick={(e)=>editProfile(e.target.value)}>X</button> </h6>
                    :<h6>Nombre de usuario: {profile.username} <button value="username" onClick={(e)=>editProfile(e.target.value)}>X</button> </h6>}
                    
                    {errors.username?<h5>{errors.username}</h5>:null}

                    {buttonedit.city?<h6>Ciudad: <input name="city" onChange={(e)=> onChange(e)} defaultValue={profile.city}/> <button value="city" onClick={(e)=>editProfile(e.target.value)}>X</button> </h6>
                    :<h6>Ciudad: {profile.city} <button value="city" onClick={(e)=>editProfile(e.target.value)}>X</button> </h6>}
                    
                    <h4>Elo: {player.elo}</h4>
                    
                    {
                        flag && !errors.name && !errors.lastName && !errors.telephone && !errors.username?
                        <button onClick={(e)=>onSubmit(e)} >Efectuar cambios al usuario</button>:null
                    }

                </div>

                </div>
            </div>:null}
        </>
        )

    
    
}
