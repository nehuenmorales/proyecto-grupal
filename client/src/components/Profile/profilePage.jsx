import { useEffect, useState } from "react"
import { useDispatch,  useSelector } from "react-redux"
import { getPlayersProfile, putPlayer } from "../../redux/Players/GetPlayersAction"
import s from "./profilePage.module.css"
import axios from "axios"

export default function ProfileData({email,user}) {
    const mail=email
    const [cities, setCities] = useState([])
     const [input, setInput] = useState('')
     const [click, setClick] = useState(false)
    const [cityInput, setCityInput] = useState([])
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
        axios.get('http://localhost:3001/owner/getCities')
            .then((resp) => {
            console.log('cities',resp.data)
            setCities(resp.data)})
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

     const handleChangeCity = (ev) => {
        setInput(ev.target.value)
        autocomplete(ev)
    }
    const onClickCity = (ev) => {
        ev.preventDefault()
        setInput(ev.target.value)
        setCityInput([])
        setClick(true)
    }
     function autocomplete(ev) {
        const value = ev.target.value;
        const results = cities.filter(city => {
        return city.toLowerCase().startsWith(value.toLowerCase());
       })
       console.log('results',results)
       setCityInput(results)
  
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

                    {buttonedit.city?
                    
                    <h6>Ciudad: <input name="city" onChange={(e)=> onChange(e)} defaultValue={profile.city}/> <button value="city" onClick={(e)=>editProfile(e.target.value)}>X</button> </h6>
                    
                    :
                    <div class="container">
                            <form>
                                <input
                                  placeholder="Search for a country"
                                  aria-label='Search for a country'
                                  aria-autocomplete='both'
                                  aria-controls='autocomplete-results'
                                  value={input}
                                  onChange={(ev) => handleChangeCity(ev)}
                                />
                                <button
                                 type='submit'
                                 aria-label='Search'
                                >
                                <svg viewBox='0 0 24 24'>
                                     <path d='M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z' />
                                     </svg>
                                </button>
                                    <div>
                                    <ul
                                      id='autocomplete-results'
                                      role='listbox'
                                      aria-label='Search for a country'
                                    >{
                                    cityInput ? cityInput?.map((elem, index) => {
                                            return (
                                                        <li id={index}><button onClick={(e) => onClickCity(e)} value={elem}>{elem}</button></li>
                                                    )
                                                }) : null
                                            }
                                             {!click ? <div>Debes seleccionar una ciudad</div> : null}
                                            </ul>
                                            </div>
                                    </form>
                        </div>
                    // <h6>Ciudad: {profile.city} <button value="city" onClick={(e)=>editProfile(e.target.value)}>X</button> </h6>
                    
                    }
                    
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
