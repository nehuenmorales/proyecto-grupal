import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import InputGroup from 'react-bootstrap/InputGroup';
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import Location from "../location";
import './createComplex.css'
import { createComplex } from "../../../redux/OwnerComplex/complexActions";
import { Autocomplete } from "@react-google-maps/api";
import { useHistory } from "react-router-dom";
import swal from 'sweetalert';
import { useAuth0 } from '@auth0/auth0-react';


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

export default function CreateComplex() {
    const { user, isAuthenticated, isLoading } = useAuth0();


    const dispatch = useDispatch()
    let owner = useSelector((state) => state.getOwnerReducer.owner)
    const [cityInput, setCityInput] = useState([])
    const [click, setClick] = useState(false)
    const [input, setInput] = useState('')
    const [cities, setCities] = useState([])
    const [selected, setSelected] = useState(null);
    const [centerState, setCenterState] = useState({ lat: 43.45, lng: -80.49 });
    const [complexName, setComplexName] = useState([])
    const [location, setLocation] = useState(
        {
            lat: null,
            lng: null,
            city: '',
            address: ''
        }
    )
    const [newComplex, setNewComplex] = useState({
        name: "",
        image: "",
        description: "",
        sports: [],
        address: "",
        city: "",
        state: "",
        country: "",
        lat: "",
        lng: "",
        reviews: 0
    });
    const [errors, setErrors] = useState({
        name: "Debe ingresar un nombre",
        image: "",
        description: "",
        sports: "",
        address: "",
        city: "",
        state: ""
    });

    const [file, setFile] = useState("")

    const [loading, setLoading] = useState(false)


    const history = useHistory()


    useEffect(() => {
        console.log(owner, "este es el owner")
        axios.get('https://falta-uno-1.herokuapp.com/owner/getCities')
            .then((resp) => {
                console.log('cities', resp.data)
                setCities(resp.data)
            })

        axios.get('https://falta-uno-1.herokuapp.com/owner/getNameComplex')
            .then((res) => {
                setComplexName(res.data)
            })
    }, [])


    useEffect(() => {
        let dividir = location.address.split(',')
        setNewComplex({ ...newComplex, address: location.address, lat: location.lat, lng: location.lng, country: dividir[dividir.length - 1], state: dividir[dividir.length - 2] })
        let errors = validator({ ...newComplex, address: location.address });
        setErrors(errors);
    }, [location.address])

    const validator = (complex) => {// funcion que valida que todos los inputs tengan un valor "aceptable"
        let validations = {};
        let provinceValidation = SoloLetras(complex.state)
        let cityValidation = SoloLetras(complex.city)
        const beNumber = /(^\d{1,10}$)/;
        if (!complex.name) {
            validations.name = "Ingrese un nombre"
        } else if (complexName.includes(complex.name)) {
            validations.name = "Nombre no disponible. Ingrese uno nuevo"
        }
        else if (complex.name?.length > 30) {
            validations.name = "Superó el máximo de caracteres"
        } else if (!complex.description) {
            validations.description = "Ingrese una descripción del complejo"
        } else if (complex.description?.length > 1400) {
            validations.description = "Alcanzó el limite de caracteres"
        } else if (complex.sports?.length == 0) {
            validations.sports = "Ingrese un deporte"
        } else if (!complex.image) {
            validations.image = "Debe ingresar una imagen"
        } else if (!complex.address) {
            validations.address = "Marque en el mapa donde se ubica el complejo"
        }
        else if (!complex.image) {
            validations.image = "Ingrese una imagen"
        }
        return validations;
    };

    const handleInputChange = (e) => {
        setNewComplex({
            ...newComplex,
            [e.target.name]: e.target.value,
        });
        let errores = validator({ ...newComplex, [e.target.name]: e.target.value });
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
        console.log('respuestaa', data1) // reemplazar con un mensaje de éxito o la acción deseada
        setNewComplex({
            ...newComplex,
            image: data1.url,
        });
        let errors = validator({ ...newComplex, image: file });
        setErrors(errors);
        setLoading(false)
    };


    const handleInputSport = (e) => {
        if (!newComplex.sports?.includes(e.target.value)) {
            setNewComplex({ ...newComplex, sports: [...newComplex.sports, e.target.value] })
        }
        let errors = validator({ ...newComplex, sports: [...newComplex.sports, e.target.value] });
        setErrors(errors);

    }

    function autocomplete(ev) {
        const value = ev.target.value;
        const results = cities.filter(city => {
            return city.toLowerCase().startsWith(value.toLowerCase());
        })
        console.log('results', results)
        setCityInput(results)

    }

    const handleChangeCity = (ev) => {
        setInput(ev.target.value)
        autocomplete(ev)
        setClick(false)
    }

    const onClickCity = (ev) => {
        ev.preventDefault()
        setInput(ev.target.value)
        setCityInput([])
        setClick(true)
        setNewComplex({ ...newComplex, city: (ev.target.value).toLowerCase() })
        let errors = validator({ ...newComplex, city: ev.target.value });
        setErrors(errors);
    }

    const onClickSport = (ev) => {
        ev.preventDefault()
        const filtrado = newComplex.sports.filter((e) => {
            return e !== ev.target.value
        })
        setNewComplex({ ...newComplex, sports: filtrado })
        let errors = validator({ ...newComplex, sports: filtrado });
        setErrors(errors);

    }


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createComplex({ ...newComplex, id: newComplex.name, ownerId: user.sub }));
        setNewComplex({
            name: "",
            image: "",
            description: "",
            sports: [],
            address: "",
            city: "",
            state: "",
            country: "",
            lat: "",
            lng: "",
            reviews: 0

        })
        setErrors({
            name: "Debe ingresar un nombre",
            image: "",
            description: "",
            sports: "",
            address: "",
            city: "",
            state: "",
        })
        swal('', "Complejo creado exitosamente!", 'success')
        history.push("/")
    }


    return (
        <div className='contenedorCreateComplex'>
            <div className="divSup">
                <Link to='/' className="botonVolver">
                    <Button>Volver</Button>
                </Link>
                <div className="tituloComplejo">
                    <h3 className="fw-normal text-white fst-italic m-9" style={{ fontSize: '.7em' }}>Creando complejo</h3>
                </div>

            </div>


            <form onSubmit={(e) => handleSubmit(e)} /*encType='multipart/form-data'*/ autocomplete="off" >
                <div className="contenedorInputs">
                    {/* NOMBRE DE LA CANCHA */}
                    <div className="contenedorIzquierda">
                        <div className='divInputs'>
                            {/* <h3>Nombre del complejo</h3> */}
                            <input type="text"
                                name="name"
                                className="inpuName"
                                placeholder="Nombre del complejo"
                                onChange={(e) => handleInputChange(e)} />
                            {errors.name ? <div className="errores">{errors.name}</div> : null}
                        </div>
                        {/* DESCRIPCION DE LA CANCHA */}
                        <div className='divInputs'>
                            {/* <h5>Descripcion del complejo</h5> */}
                            <input
                                type="textarea"
                                name="description"
                                className="inpuName"
                                placeholder="Descripción del complejo"
                                onChange={(e) => handleInputChange(e)} />

                            {errors.description ? <div className="errores">{errors.description}</div> : null}
                        </div>
                        {/*DEPORTES */}
                        <div className='divInputsSport'>

                            <h5 style={{ fontSize: '1.2em' }}>¿Con canchas de qué deportes cuenta el complejo?</h5>
                            <div className="deportesElegidos">
                                <div>
                                    <select onChange={(e) => handleInputSport(e)} className='selectSports'>
                                        <option name='futbol' value='futbol'>Futbol</option>
                                        <option name='tenis' value='tenis'>Tenis</option>
                                        <option name='padel' value='padel'>Padel</option>
                                        <option name='basquet' value='basquet'>Basquet</option>
                                    </select>
                                </div>
                                <div className="derechaSports">
                                    {newComplex.sports.length > 0 ? newComplex.sports.map((e) => {
                                        return (
                                            <button className="deportes" value={e} onClick={(ev) => onClickSport(ev)}> {e.charAt(0).toUpperCase() + e.slice(1)}</button>
                                        )
                                    }) : null}
                                </div>
                            </div>
                            {errors.sports ? <div className="errores">{errors.sports}</div> : null}
                        </div>
                        {/* IMAGEN DE LA CANCHA */}
                        <div className='divInputsImage' style={{ display: 'flex', flexDirection: 'column' }}>
                            <div>
                                <h5 style={{ marginBottom: '10px', fontSize: '1.2em' }}>Imagen del complejo</h5>
                                <input type="file" className="inputImage" onChange={(e) => upload(e.target.files[0])}></input>
                                {loading ? <span className='loader' style={{ marginTop: '7px' }}></span> : null}
                            </div>
                            {errors.image ? <div className="errores">{errors.image}</div> : null}
                        </div>
                        <h5 style={{ fontSize: '1.2em', marginBottom: '10px' }}>Ubicación de complejo</h5>
                        {/* <h6>Ciudad</h6> */}
                        <div class="containerDerecha">

                            <form className="formCity">
                                <div className="inputCity">
                                    <input
                                        aria-label='Search for a country'
                                        aria-autocomplete='both'
                                        aria-controls='autocomplete-results'
                                        value={input}
                                        className="inpuName"
                                        placeholder='Ingrese una ciudad'
                                        onChange={(ev) => handleChangeCity(ev)}
                                    />
                                    {!click ? <div className="errores">Debes seleccionar una ciudad</div> : null}
                                </div>

                                {/* <button
                                                type='submit'
                                                aria-label='Search'
                                            >
                                                <svg viewBox='0 0 24 24'>
                                                    <path d='M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z' />
                                                </svg>
                                            </button> */}
                                <div className="contenedorScroll">
                                    <div className="scroll">
                                        <ul
                                            id='autocomplete-results'
                                            role='listbox'
                                            aria-label='Search for a country'
                                        >{
                                                cityInput ? cityInput?.map((elem, index) => {
                                                    return (
                                                        <div key={index} className='opcionesCity'>
                                                            <li id={index}><button className='botonCity' onClick={(e) => onClickCity(e)} value={elem}>{elem}</button></li>
                                                        </div>
                                                    )
                                                }) : null
                                            }  {errors.city ? <div className="errores">{errors.city}</div> : null}

                                        </ul>
                                    </div>
                                </div>



                            </form>
                        </div>
                    </div>
                    <div className="contenedorDerecha">
                        <Location selected={selected} setSelected={setSelected} centerState={centerState} setCenterState={setCenterState} location={location} setLocation={setLocation} />

                        <div className='contenedorBoton'>
                            {
                                !loading &&
                                    click &&
                                    !errors.name &&
                                    !errors.description &&
                                    !errors.address &&
                                    !errors.state &&
                                    !errors.sports &&
                                    !errors.image ?
                                    <button type="submit" className='botonActivo'
                                    >Crear</button> : <button type="submit" className='btnGris' disabled >Crear</button>
                            }

                        </div>
                    </div>


                </div>
                {/* BOTON SUBMIT */}
            </form>

        </div>
    )
}
