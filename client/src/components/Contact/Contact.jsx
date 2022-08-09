import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import emailjs from 'emailjs-com';
import VerticalNavBarCan from '../VerticalNavbar/VerticalNavBarCan';
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import s from '../Fields/CreateFields/forms.module.css'      
import { Flex } from "@chakra-ui/react"
import './Contact.css'

export default function Contact (){
    
        const enviarEmail = (e) => {
            e.preventDefault();
            emailjs.sendForm('service_e31gpn6','template_kcvpz8a',e.target, '8pAhqJrxv2RO5fnUg').then(res=>{
                console.log(res);
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
                                <input type="text" className="formEmail" id="nombre" name="nombre"/>
                            </div>
                            <div className="contenedorInpputss">
                                <label className='tituloInput'><b>Email</b></label>
                                <input type="text" className="formEmail" id="email" name="email"/>
                            </div>
                        </div>
                        <div className="contenedorInpputss">
                            <label className='tituloInput'><b>Mensaje</b></label>
                            <textarea type="text" className="formEmail" id="mensaje" name="mensaje"></textarea>
                        </div>
                        <div className='ContenedorBoton'>
                        <button type="submit" className="btn btn-primary" style={{backgroundColor:'rgba(0, 184, 63, 1)',border:'none', width:"50%", margin:"0 auto",marginTop:"20px"}}>Enviar Correo</button>
                        </div>
                    </form>
                </div>
            </div>
            </>
            </Flex>
        )
    
}