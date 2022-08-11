import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import emailjs from 'emailjs-com';
import VerticalNavBarCan from '../VerticalNavbar/VerticalNavBarCan';
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import s from '../Fields/CreateFields/forms.module.css'      
import { Flex } from "@chakra-ui/react"
import './Contact.css'
import swal from 'sweetalert';

export default function Contact (){
    const [errors, setErrors] = useState({
        nombre: 'Debe ingresar su nombre',
        email: '',
        mensaje: ''
    })
   const [input, setInput] = useState({
        nombre: '',
        email: '',
        mensaje: ''
    })
    const validador = (inputs) => {
        let validations = {};
        const nameExpresion = /[0-9/'0-9'/,*+._&=():;%$#!|-]/gi;
        const emailExpresion = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!inputs.nombre){
            validations.nombre = 'Debe ingresar su nombre'
        } else if (nameExpresion.test(inputs.nombre)){
            validations.nombre = 'Ingrese solo letras'
        } else if (!inputs.email){
            validations.email = 'Debe ingresar su email'
        }
        else if (!emailExpresion.test(inputs.email)){
            validations.email = 'Ingrese un email válido'
        } 
        else if (!inputs.mensaje){
            validations.mensaje = 'Debe ingresar un mensaje'
        }
        return validations
    }

    const handleOnChange = (e)=> {
        setInput({ 
            ...input, 
            [e.target.name]: e.target.value
        })
         const errores=  validador({...input, [e.target.name]: e.target.value})
        setErrors(errores)
    }
    
        const enviarEmail = (e) => {
            e.preventDefault();
            emailjs.sendForm('service_e31gpn6','template_kcvpz8a',e.target, '8pAhqJrxv2RO5fnUg').then(res=>{
                console.log(res);
            })
        swal('', "¡Enviado exitosamente!", 'success')
        setInput({
            nombre: '',
            email: '',
            mensaje: ''
        })
        }

        return (
            <Flex>
              <VerticalNavBarCan />
              <>
                <Link to='/owner/select'>
                   <Button className={s.volverbtn}>Volver</Button>
                </Link>
            <div className='emailContainer'>
                <div className='cajitaEmail'>
                    <div className='cajitaTitulo'>
                    <h1>Formulario de Contacto con el Admin</h1>
                    </div>
                    <form onSubmit={enviarEmail}>
                        <div className="form-row">
                            <div className="contenedorInpputss">
                                <label className='tituloInput'><b>Nombre</b></label>
                                <input type="text" onChange={e => handleOnChange(e)} className="formEmail" id="nombre" name="nombre" value={input.nombre}/>
                                {errors.nombre ? <p style={{color: 'red', marginBottom: '10px'}}>{errors.nombre}</p> : null}
                            </div>
                            <div className="contenedorInpputss">
                                <label className='tituloInput'><b>Email</b></label>
                                <input type="text" onChange={e => handleOnChange(e)} className="formEmail" id="email" name="email" value={input.email}/>
                                {errors.email ? <p style={{color: 'red', marginBottom: '10px'}}>{errors.email}</p> : null}
                            </div>
                        </div>
                        <div className="contenedorInpputss">
                            <label className='tituloInput'><b>Mensaje</b></label>
                            <textarea type="text" onChange={e => handleOnChange(e)} className="formEmail" id="mensaje" name="mensaje" value={input.mensaje}></textarea>
                            {errors.mensaje ? <p style={{color: 'red', marginBottom: '10px'}}>{errors.mensaje}</p> : null}
                        </div>
                        <div className='ContenedorBoton'>
                            { !errors.nombre && !errors.email && !errors.mensaje ?
                        <button type="submit" className="btn btn-primary" style={{backgroundColor:'rgba(0, 184, 63, 1)',border:'none', width:"50%", margin:"0 auto",marginTop:"20px"}}>Enviar Correo</button>
                            : <button type="submit" disabled className="btn btn-primary" style={{backgroundColor:'rgba(195, 195, 195)',border:'none', width:"50%", margin:"0 auto",marginTop:"20px"}}>Enviar Correo</button>
                    }
                        </div>
                    </form>
                </div>
            </div>
            </>
            </Flex>
        )
    
}