import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { createSponsor } from "../../redux/Sponsors/SponsorsActions.js";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useToast } from '@chakra-ui/react'
import { Link } from "react-router-dom"

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
        image: "",
        link: "",
        cuit: "",
        address: "",
    });
    const [errors, setErrors] = useState({
        name: "Debe ingresar un nombre",
        cuit: "",
        address: "",
        image: "",
    });

    const [loading, setLoading] = useState(false)


    const history = useHistory()

    const validator = (sponsor) => {// funcion que valida que todos los inputs tengan un valor "aceptable"
        let validations = {};
        const beNumber = /(^\d{1,10}$)/;
        const beCuit = /^(20|23|27|30|33)([0-9]{9}|-[0-9]{8}-[0-9]{1})$/g
        if (!sponsor.name) {
            validations.name = "Ingrese un nombre"
        } else if (beNumber.test(sponsor.name)) {
            validations.name = "Ingrese solo letras"
        }
        else if (sponsor.name?.length > 30) {
            validations.name = "Superó el máximo de caracteres"
        } else if (!sponsor.cuit) {
            validations.cuit = "Ingrese un cuit"
        } else if (!beCuit.test(sponsor.cuit)) {
            validations.cuit = "Ingrese un cuit válido"
        }
        else if (!sponsor.address) {
            validations.address = "Ingrese la dirección"
        }
        else if (!sponsor.image) {
            validations.image = "Ingrese el logo de su marca"
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

    const upload = async (file) => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", 'sdujndiw');
        setLoading(true)
        const response = await fetch(`https://api.cloudinary.com/v1_1/dttguisff/upload`,
            { method: "POST", body: data })
        const data1 = await response.json()
        setNewSponsor({
            ...newSponsor,
            image: data1.url,
        });
        let errors = validator({ ...newSponsor, image: file });
        setErrors(errors);
        setLoading(false)
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createSponsor(newSponsor));
        setNewSponsor({
            name: "",
            image: "",
            link: "",
            cuit: "",
            address: "",
        });
        setErrors({
            name: "Debe ingresar un nombre",
            link: "",
            cuit: "",
            adress: "",
            image: "",
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
            <div className="divSup" style={{ backgroundImage: 'url(https://static.vecteezy.com/system/resources/previews/001/946/627/large_2x/soccer-ball-on-the-lawn-free-photo.jpg)' }}>
                <Link to='/' className="botonVolver">
                    <Button>Volver</Button>
                </Link>

            </div>
            <form onSubmit={(e) => handleSubmit(e)} /*encType='multipart/form-data'*/ autocomplete="off"  style={{width: '100%'}}>
                <div className="tituloComplejo">

                    <h3 className="fw-normal text-white fst-italic m-9" style={{ fontSize: '.7em' }}>Creando Sponsor</h3>
                </div>
                <div className="contenedorInputs" style={{display:'flex', flexDirection: 'row', justifyContent: 'space-around', width:'100%'}}>
                    {/* NOMBRE DEL SPONSOR */}
                    <div className="inputss-izquierda">
                        <div className='divInputs'>
                            <p style={{ color: 'rgba(18, 141, 255, 1)', fontSize: '20px', fontWeight: '600', marginTop: '30px' }}>Nombre del sponsor</p>
                            <input type="text"
                                name="name"
                                onChange={(e) => handleInputChange(e)} 
                                style={{width: '350px', height:'40px', borderRadius:'10px', color:'black', paddingLeft:'5px'}}
                                />
                            {errors.name ? <div className="errores">{errors.name}</div> : null}
                        </div>
                        <div className='divInputs'>
                            <p style={{ color: 'rgba(18, 141, 255, 1)', fontSize: '20px', fontWeight: '600', marginTop: '30px' }}>CUIT</p>
                            <input type="text"
                                name="cuit"
                                onChange={(e) => handleInputChange(e)}
                                style={{width: '350px', height:'40px', borderRadius:'10px', color:'black', paddingLeft:'5px'}} />
                            {errors.cuit ? <div className="errores">{errors.cuit}</div> : null}
                        </div>
                        <div className='divInputs'>
                            <p style={{ color: 'rgba(18, 141, 255, 1)', fontSize: '20px', fontWeight: '600', marginTop: '30px' }}>Dirección</p>
                            <input type="text"
                                name="address"
                                onChange={(e) => handleInputChange(e)} 
                                style={{width: '350px', height:'40px', borderRadius:'10px', color:'black', paddingLeft:'5px'}}/>
                            {errors.address ? <div className="errores">{errors.address}</div> : null}
                        </div>
                    </div>
                    <div className="inputss-derecha">
                        <div className='divInputs'>
                            <p style={{ color: 'rgba(18, 141, 255, 1)', fontSize: '20px', fontWeight: '600', marginTop: '30px' }}>Link de la página/Instagram</p>
                            <input type="text"
                                name="link"
                                onChange={(e) => handleInputChange(e)}
                                style={{width: '350px', height:'40px', borderRadius:'10px', color:'black', paddingLeft:'5px'}} />
                        </div>

                        {/* IMAGEN DE LA CANCHA */}
                        <div className='divInputsImage'>
                            <p style={{ color: 'rgba(18, 141, 255, 1)', fontSize: '20px', fontWeight: '600', marginTop: '30px' }}>Logo del sponsor</p>
                            {/* <input
                                type="file"
                                name="image"
                                className="inputImage"
                                onChange={uploadImage}
                                accept="image/*" 
                                style={{width: '350px', height:'40px', borderRadius:'10px'}}/> */}
                                <input type="file" name='image' className="inputImage" onChange={(e) => upload(e.target.files[0])}></input>
                            {loading ? <span></span> : null}
                            {errors.image ? <div className="errores">{errors.image}</div> : null}
                        </div>


                        <div className='contenedorBoton' style={{ marginLeft:'0px', paddingLeft:'0px'}}>
                            {
                                !loading &&
                                    !errors.name &&
                                    !errors.link &&
                                    !errors.cuit &&
                                    !errors.address &&
                                    !errors.image ?
                                    <button type="submit" className='botonActivo' style={{width:'350px', paddingTop:'7px', paddingBottom:'7px', marginTop:'20px'}}
                                    >Crear sponsor</button> : <button type="submit" className='btnGris' style={{width:'350px', paddingTop:'7px', paddingBottom:'7px', marginTop:'20px'}} disabled >Crear sponsor</button>
                            }

                        </div>
                    </div>
                    {/* BOTON SUBMIT */}
                </div>
            </form>

        </div>
    )
}