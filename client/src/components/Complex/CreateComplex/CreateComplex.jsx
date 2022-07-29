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
    const dispatch = useDispatch()
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
    });
    const [errors, setErrors] = useState({
        name: "Debe ingresar un nombre",
        image: "",
        description: "",
        sports: "",
        address: "",
        city: "",
        state: "",
    });

    const [loading, setLoading] = useState(false)

    let owner = useSelector((state) => state.getOwnerReducer.owner)
    console.log('owner', owner)
    

    useEffect(() => {
        axios.get('https://falta-uno-1.herokuapp.com/owner/getCities')
        .then((resp) => {
        console.log('cities',resp.data)
        setCities(resp.data)})

        axios.get('https://falta-uno-1.herokuapp.com/owner/getNameComplex')
        .then((res) => {
            setComplexName(res.data)
        })  
    },[])


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
        } else if (complex.description?.length > 140) {
            validations.description = "Alcanzó el limite de caracteres"
        } else if (complex.sports?.length == 0) {
            validations.sports = "Ingrese un deporte"
        } else if (!complex.address) {
            validations.address = "Marque en el mapa donde se ubica el complejo"
        } 
        else if (cityValidation !== true) {
            validations.city = cityValidation
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

        setNewComplex({
            ...newComplex,
            image: respuesta.data.data.url,
        });
        setLoading(false)
        let errors = validator({ ...newComplex, [e.target.name]: e.target.value });
        setErrors(errors);
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
       console.log('results',results)
       setCityInput(results)
  
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
        setNewComplex({...newComplex, city: (ev.target.value).toLowerCase()})
        let errors = validator({ ...newComplex, city: ev.target.value });
        setErrors(errors);
    }
    console.log(input, 'input')

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createComplex({ ...newComplex, ownerId: owner.id, id: newComplex.name}));
    }
    console.log('owner', owner)
    console.log('errores', errors)
    console.log('newComplex', newComplex)


    return (
        <div className='contenedor bg-light'>
            <div >
                <Link to='/'>
                    <Button>Volver</Button>
                </Link>
                <div>
                    <h3><i>Futbol</i></h3>
                </div>

            </div>


            <form onSubmit={(e) => handleSubmit(e)} /*encType='multipart/form-data'*/>
                <div >
                    <div >
                        {/* NOMBRE DE LA CANCHA */}
                        <div>
                            <h5>Nombre del complejo</h5>
                            <input type="text"
                                name="name"
                                onChange={(e) => handleInputChange(e)} />
                            {errors.name ? <div >{errors.name}</div> : null}
                        </div>
                        <div className='col-md-6 col-sm-12 px-5'>
                            {/* DESCRIPCION DE LA CANCHA */}
                            <div>
                                <h5>Descripcion del complejo</h5>
                                <input
                                    type="textarea"
                                    name="description"
                                    // placeholder="Descripción de la cancha"
                                    onChange={(e) => handleInputChange(e)} />

                                {errors.description ? <div>{errors.description}</div> : null}
                            </div>
                            {/*DEPORTES */}
                            <div>
                                <h5>¿Con canchas de qué deportes cuenta el complejo?</h5>
                                <select onChange={(e) => handleInputSport(e)}>
                                    <option name='futbol' value='futbol'>Futbol</option>
                                    <option name='tenis' value='tenis'>Tenis</option>
                                    <option name='padel' value='padel'>Padel</option>
                                    <option name='basquet' value='basquet'>Basquet</option>
                                </select>
                                {errors.sports ? <div>{errors.sports}</div> : null}
                            </div>
                            {/* {UBICACION} */}
                            <div>
                                <h5>Ubicación de complejo</h5>
                                <h6>Ciudad</h6>
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
                                {errors.city ? <div>{errors.city}</div> : null}
                                <Location selected={selected} setSelected={setSelected} centerState={centerState} setCenterState={setCenterState} location={location} setLocation={setLocation} />
                            </div>
                            {/* IMAGEN DE LA CANCHA */}
                            <div>
                                <h5>Imagen del complejo</h5>
                                <input
                                    type="file"
                                    name="image"
                                    onChange={uploadImage}
                                    accept="image/*" />
                                {loading ? <span></span> : null}
                            </div>
                        </div>
                    </div>
                    {/* BOTON SUBMIT */}
                    <div >
                        {
                            !loading &&
                                !errors.name &&
                                !errors.description &&
                                !errors.address &&
                                !errors.state &&
                                !errors.sports  &&
                                !errors.image ?
                                <button type="submit"
                                >Crear</button> : <button type="submit" disabled >Crear</button>
                        }

                    </div>
                </div>


            </form>

        </div>
    )
}
