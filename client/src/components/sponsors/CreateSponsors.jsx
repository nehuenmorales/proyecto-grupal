import { useState } from "react";
import axios from "axios";
import { useDispatch} from "react-redux";
import { createSponsor } from "../../redux/Sponsors/SponsorsActions.js";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useToast } from '@chakra-ui/react'
import {Link} from "react-router-dom"

function SoloLetras(input) {

    var ExpRegLetrasEspacio = "^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$";
    if (input?.match(ExpRegLetrasEspacio) != null) {
        return true;
    }
    else if (input?.match(ExpRegLetrasEspacio) == null) {
        return ("Ingrese solo letras")
    }
    else {
        return true;
    }
}

export default function CreateSponsors() {
    const dispatch = useDispatch()
    const toast = useToast()

    const [newSponsor, setNewSponsor] = useState({
        name: "",
        logo: "",
        link: "",
        cuit: "",
        address: "",
    });
    const [errors, setErrors] = useState({
        name: "Debe ingresar un nombre",
        cuit: "",
        address: "",
        logo: "",
    });
    
    const [loading, setLoading] = useState(false)
    
    
    const history = useHistory()

    const validator = (sponsor) => {// funcion que valida que todos los inputs tengan un valor "aceptable"
        let validations = {};
        const beNumber = /(^\d{1,10}$)/;
        if (!sponsor.name) {
            validations.name = "Ingrese un nombre"
        }
        else if (sponsor.name?.length > 30) {
            validations.name = "Superó el máximo de caracteres"
        } else if (!sponsor.cuit) {
            validations.cuit = "Ingrese un cuit"
        } else if (!sponsor.address) {
            validations.address = "Ingrese la direccion"
        } 
        else if (!sponsor.logo) {
            validations.logo = "Ingrese una imagen"
        }
        return validations;
    };

    const handleInputChange = (e) => {
        setNewSponsor({
            ...newSponsor,
            [e.target.name]: e.target.value,
        });
        let errores = validator({ ...newSponsor, [e.target.name]: e.target.value });
        setErrors(errores);
    }

    const uploadImage = async (e) => {
        const form = new FormData();
        form.append("image", e.target.files[0]);
        console.log(e.target.files);
        const settings = {
            "method": "POST",
            "timeout": 0,
            "processData": false,
            "mimeType": "multipart/form-data",
            "contentType": false,
            "data": form
        };
        setLoading(true)

        const respuesta = await axios("https://api.imgbb.com/1/upload?expiration=600&key=12d5944c0badc6235fe12ec6550754c8", settings)

        setNewSponsor({
            ...newSponsor,
            logo: respuesta.data.data.url,
        });
        setLoading(false)
        let errors = validator({ ...newSponsor, logo: e.target.value });
        setErrors(errors);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createSponsor(newSponsor));
        setNewSponsor({
            name: "",
            logo: "",
            link: "",
            cuit: "",
            address: "",
        });
        setErrors({
            name: "Debe ingresar un nombre",
            link: "",
            cuit: "",
            adress: "",
            logo: "",
        });
        toast({
            title: 'Sponsor creado correctamente',
            status: 'success',
            duration: 9000,
            isClosable: true,
        })
        history.push("/")
    }


    return (
        <div className='contenedorCreateComplex'>
            <div className="divSup">
            <Link to='/' className="botonVolver">
                    <Button>Volver</Button>
            </Link>
                <div className="tituloComplejo">
                    <h3 className="fw-normal text-white fst-italic m-9" style={{fontSize: '.7em'}}>Creando Sponsor</h3>
                </div>
            </div>
            <form onSubmit={(e) => handleSubmit(e)} /*encType='multipart/form-data'*/ autocomplete="off" >
                    <div className="contenedorInputs">
                        {/* NOMBRE DEL SPONSOR */}
                        <div className="contenedorIzquierda">
                        <div className='divInputs'>
                            <input type="text"
                                name="name"
                                className="inpuName"
                                placeholder="Nombre del sponsor"
                                onChange={(e) => handleInputChange(e)} />
                            {errors.name ? <div className="errores">{errors.name}</div> : null}
                        </div>
                        <div className='divInputs'>
                            {/* <h3>Nombre del complejo</h3> */}
                            <input type="text"
                                name="cuit"
                                className="inpuName"
                                placeholder="Cuit"
                                onChange={(e) => handleInputChange(e)} />
                            {errors.cuit ? <div className="errores">{errors.cuit}</div> : null}
                        </div>
                        <div className='divInputs'>
                            <input type="text"
                                name="address"
                                className="inpuName"
                                placeholder="Direccion"
                                onChange={(e) => handleInputChange(e)} />
                            {errors.address ? <div className="errores">{errors.address}</div> : null}
                        </div>
                        <div className='divInputs'>
                            <input type="text"
                                name="link"
                                className="inpuName"
                                placeholder="Link"
                                onChange={(e) => handleInputChange(e)} />
                        </div>
                            
                            {/* IMAGEN DE LA CANCHA */}
                            <div className='divInputsImage'>
                                <h5>Logo del sponsor</h5>
                                <input
                                    type="file"
                                    name="image"
                                    className="inputImage"
                                    onChange={uploadImage}
                                    accept="image/*" />
                                {loading ? <span></span> : null}
                                {errors.image ?  <div className="errores">{errors.image}</div> : null}
                            </div>
                            
                            </div>
                        </div>
                    {/* BOTON SUBMIT */}
                    <div className='contenedorBoton'>
                        {
                            !loading &&
                                !errors.name &&
                                !errors.link &&
                                !errors.cuit &&
                                !errors.address &&
                                !errors.logo?
                                <button type="submit" className='botonActivo'
                                >Crear</button> : <button type="submit" className='btnGris' disabled >Crear Sponsor</button>
                        }

                    </div>
            </form>

        </div>
    )
}