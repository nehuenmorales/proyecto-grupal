import React, { useEffect, useState } from 'react';
import { getOwner } from '../../../redux/GetOwner/getOwnerAction';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import s from '../profilePage.module.css'
import axios from 'axios';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';
import './ownerProfile.css'

export default function OwnerProfile() {
    const { user, isAuthenticated, isLoading } = useAuth0();
    let owner = useSelector((state) => state.getOwnerReducer.owner)
    const dispatch = useDispatch();
    const history = useHistory();
    const [input, setInput] = useState({
        username: '',
        name: '',
        lastName: '',
        telephone: ''
    })

    useEffect(() => {
        setInput({
            username: owner?.username,
            name: owner?.name,
            lastName: owner?.lastName,
            telephone: owner?.telephone
        })
    }, [owner])

    useEffect(() => {
        dispatch(getOwner(user.sub))
    }, [])

    console.log('soy owner bro', owner)

    const handleInputChange = (e) => {
        e.preventDefault()
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const onClick = (e) => {
        e.preventDefault()
        axios.put(`https://falta-uno-1.herokuapp.com/owner/modifyOwner/${owner.id}`)
        swal('', "Perfil modificado exitosamente!", 'success')
        history.push("/")

    }

    console.log('inputtt', input)

    return (
        <div className='container-general'>
            <div className='containerimagen'>
                <img src={user.picture} className='imagen-owner' alt="Profile Image" style={{display:'flex', alignItems:'center', justifyContent:'center'}}/>
                <h5 className="fw-normal text-white fst-italic" style={{ fontSize: '1.5em', width: '100%', marginTop: '20px' }}>{owner.email}</h5>
            </div>
            <div className='container-owner'>

                <div className='contenedorLapiz' >
                    <p className="subTitulos" style={{marginLeft: '0px'}}>Nombre</p>
                    <img src='https://cdn-icons-png.flaticon.com/512/1250/1250615.png' className='lapiz' style={{ marginTop: '40px' }}></img>
                </div>
                <input type="text" name='name' value={input.name} placeholder={input.name} onChange={(e) => handleInputChange(e)} className='inputowner'/>

                <div className='contenedorLapiz'>
                    <p className="subTitulos" style={{marginLeft: '0px'}}>Apellido</p>
                    <img src='https://cdn-icons-png.flaticon.com/512/1250/1250615.png' className='lapiz' style={{ marginTop: '40px'}}></img>
                </div>
                <input type="text" name='lastName' value={input.lastName} placeholder={input.lastName} onChange={(e) => handleInputChange(e)} className='inputowner'/>

                <div className='contenedorLapiz'>
                    <p className="subTitulos" style={{marginLeft: '0px'}}>Nombre de usuario</p>
                    <img src='https://cdn-icons-png.flaticon.com/512/1250/1250615.png' className='lapiz' style={{ marginTop: '40px' }}></img>
                </div>
                <input type="text" name='username' value={input.username} placeholder={input.username} onChange={(e) => handleInputChange(e)} className='inputowner'/>

                <div className='contenedorLapiz'>
                    <p className="subTitulos" style={{marginLeft: '0px'}}>Teléfono</p>
                    <img src='https://cdn-icons-png.flaticon.com/512/1250/1250615.png' className='lapiz' style={{ marginTop: '40px' }}></img>
                </div>
                <input type="text" name='telephone' value={input.telephone} placeholder={input.telephone} onChange={(e) => handleInputChange(e)} className='inputowner' />

            {
                input.name !== owner.name ||
                    input.lastName !== owner.lastName ||
                    input.username !== owner.username ||
                    input.telephone !== owner.telephone ?
                    <button onClick={(e) => onClick(e)} className='botonActivo-owner'>Guardar Cambios</button> :
                    <button className='btnGris-owner' disabled>Guardar Cambios</button>
            }
            </div>
        </div>
    )
}