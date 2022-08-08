import React, { useEffect, useState } from 'react';
import { getOwner } from '../../../redux/GetOwner/getOwnerAction';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import s from '../profilePage.module.css'
import axios from 'axios';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';
import './ownerProfile.css'
import a from '../../Fields/CreateFields/forms.module.css'

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
    const [errors, setErrors] = useState({
        name: "",
        lastName: "",
        telephone: "",
        username: "",
      });

      useEffect(() => {
        dispatch(getOwner(user.sub))
    }, [])

      const validador = (input) => {
        const nameExpresion = /[0-9/'0-9'/,*+._&=():;%$#!|-]/gi;
        const phoneRegularExpresion = /^\d+$/;
        // const name = input.name;
        // const value = e.target.value;
        let validations = {};
        if(!input.name) {
            validations.name = 'Debe ingresar un nombre'
        } else if (nameExpresion.test(input.name)){
            validations.name = 'Ingrese solo letras'
        } else if ( !input.lastName){
            validations.lastName = 'Debe ingresar un apellido'
        } else if (nameExpresion.test(input.lastName)){
            validations.lastName = 'Ingrese solo letras'
        } else if (!input.username) {
            validations.username = 'Debe ingresar un nombre de usuario'
        } else if (!input.telephone) {
            validations.telephone = 'Debe ingresar un número de teléfono '
        } else if (!phoneRegularExpresion.test(input.telephone)){
            validations.telephone = 'Ingrese solo números'
        }
        return validations
      };

      console.log('errors', errors)

    useEffect(() => {
        setInput({
            username: owner?.username,
            name: owner?.name,
            lastName: owner?.lastName,
            telephone: owner?.telephone
        })
    }, [owner])

    console.log('soy owner bro', owner)

    const handleInputChange = (e) => {
        e.preventDefault()
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        const errores = validador({...input, [e.target.name]: e.target.value})
        setErrors(errores)
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
                <input type="text" name='name' value={input?.name} placeholder={input?.name} onChange={(e) => handleInputChange(e)} className='inputowner'/>
                {errors?.name ? (<div style={{color: 'red'}}>{errors.name}</div>) : null}
                <div className='contenedorLapiz'>
                    <p className="subTitulos" style={{marginLeft: '0px'}}>Apellido</p>
                    <img src='https://cdn-icons-png.flaticon.com/512/1250/1250615.png' className='lapiz' style={{ marginTop: '40px'}}></img>
                </div>
                <input type="text" name='lastName' value={input?.lastName} placeholder={input?.lastName} onChange={(e) => handleInputChange(e)} className='inputowner'/>
                {errors?.lastName ? (<div style={{color: 'red'}}>{errors.lastName}</div>) : null}
                <div className='contenedorLapiz'>
                    <p className="subTitulos" style={{marginLeft: '0px'}}>Nombre de usuario</p>
                    <img src='https://cdn-icons-png.flaticon.com/512/1250/1250615.png' className='lapiz' style={{ marginTop: '40px' }}></img>
                </div>
                <input type="text" name='username' value={input?.username} placeholder={input?.username} onChange={(e) => handleInputChange(e)} className='inputowner'/>
                {errors?.username ? (<div style={{color: 'red'}}>{errors.username}</div>) : null}
                <div className='contenedorLapiz'>
                    <p className="subTitulos" style={{marginLeft: '0px'}}>Teléfono</p>
                    <img src='https://cdn-icons-png.flaticon.com/512/1250/1250615.png' className='lapiz' style={{ marginTop: '40px' }}></img>
                </div>
                <input type="text" name='telephone' value={input?.telephone} placeholder={input?.telephone} onChange={(e) => handleInputChange(e)} className='inputowner' />
                {errors?.telephone ? (<div style={{color: 'red'}}>{errors.telephone}</div>) : null}
                
            {
                !errors.name && 
                !errors.lastName && 
                !errors.username && 
                !errors.telephone && 
                (input?.name !== owner.name ||
                    input?.lastName !== owner.lastName ||
                    input?.username !== owner.username ||
                    input?.telephone !== owner.telephone) ?
                    <button onClick={(e) => onClick(e)} className='botonActivo-owner'>Guardar Cambios</button> :
                    <button className='btnGris-owner' disabled>Guardar Cambios</button>
            }
            </div>
        </div>
    )
}