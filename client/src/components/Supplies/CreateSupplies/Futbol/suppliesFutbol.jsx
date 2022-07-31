import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createSupplies } from "../../../../redux/OwnerSupplies/suppliesActions";
import s from "../formsSupplies.module.css"
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import CardSupplie from "../CardSupplie/cardSupplie";
import swal from 'sweetalert';
import { useHistory } from "react-router-dom";





export default function SuppliesFutbol() {
    const dispatch = useDispatch()

    const history = useHistory()
    const [complexName, setComplexName] = useState([])


    const [newSupplie, setNewSupplie] = useState({
        complexId: "",
        name: "",
        sport: "futbol",
        stock: "",
        price: "",
        image: ""
    })
    const [errors, setErrors] = useState({
        complexId: 'Ingrese el complejo al que pertenece la cancha',
        name: "",
        sport: "",
        stock: "",
        price: ""
    })
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        axios.get('https://falta-uno-1.herokuapp.com/owner/getNameComplex')
        .then((res) => {
          console.log(res.data, 'soy res.data')
            setComplexName(res.data)
        })  
    },[])

    const validator = (supplies) => {// funcion que valida que todos los inputs tengan un valor "aceptable"
        let validations = {};
        const beNumber = /(^\d{1,10}$)/;
        if (!supplies.complexId) {
            validations.complexId = "Ingrese el complejo al que pertenece la cancha"
          } else if (!complexName.includes(supplies.complexId)) {
            validations.complexId = `${supplies.complexId} no existe`
          } else if (!supplies.name) {
            validations.name = "Ingrese el nombre del producto"
        } else if (supplies.name.length > 30) {
            validations.name = "Superó el máximo de caracteres"
        } else if (!supplies.stock) {
            validations.stock = "Ingrese el stock del producto"
        } else if (!beNumber.test(supplies.stock)) {
            validations.stock = "Ingrese solo números"
        } else if (!supplies.price) {
            validations.price = "Ingrese el precio del producto"
        } else if (!beNumber.test(supplies.price)) {
            validations.price = "Ingrese solo numeros"
        }
        return validations;
    };

    const handleInputChange = (e) => {

        if (e.target.name === "stock" || e.target.name === "price") {
            setNewSupplie({
                ...newSupplie,
                [e.target.name]: parseInt(e.target.value),
            });
        } else {
            setNewSupplie({
                ...newSupplie,
                [e.target.name]: e.target.value,
            });
            // console.log(validator(e));
            // console.log(e.target.value);
        }
        let errors = validator({ ...newSupplie, [e.target.name]: e.target.value });
        setErrors(errors);

        console.log(newSupplie)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(createSupplies(newSupplie));
        console.log(newSupplie);
        setNewSupplie({
            name: "",
            sport: "futbol",
            stock: "",
            price: "",
            image: ""
        });
        swal('', `Elemento creado exitosamente`, 'success')

        history.push("/owner/createSupplie")

        //window.location.href = "/home"; aca nos llevaria al home en caso de que cuando se cree una nueva vaya al home
        //o se quede en la misma pag
    };

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

        setNewSupplie({
            ...newSupplie,
            image: respuesta.data.data.url,
        });
        setLoading(false)
        console.log('soy respuesta img', respuesta);
    };

    return (

        <div className={s.container}>
            <div className={s.header}>
                <Link to='/owner/createSupplie'>
                    <Button className={s.volverbtn}>Volver</Button>
                </Link>
                <div className={s.titleheader}>
                    <h3 className={s.titulo}><i>Futbol</i></h3>
                </div>
            </div>

            <form onSubmit={(e) => handleSubmit(e)} encType='multipart/form-data' >
                
                    <div className={s.inputsandcard}>
                        <div className={s.izquierda}>
                             {/* NOMBRE DEL COMPLEJO */}
              <div className={s.input}>
                <h5 className={s.titles}>Nombre del complejo</h5>
                <input
                  type="text"
                  name="complexId"
                  className={s.inputfield}
                  value={newSupplie.complexId}
                  onChange={(e) => handleInputChange(e)}
                />
                {errors.complexId ? <div className={s.error}>{errors.complexId}</div> : null}
              </div>
                    <div >
                        <h5 className={s.titles}>Nombre del elemento</h5>
                        <input
                            className={s.inputfield}
                            type="text"
                            name="name"
                            onChange={(e) => handleInputChange(e)} />
                        {errors.name ? <div className={s.error}>{errors.name}</div> : null}
                    </div>

                    <div >
                        <h5 className={s.titles}>Stock del elemento</h5>
                        <input
                            className={s.inputfield}
                            type="text"
                            name="stock"
                            onChange={(e) => handleInputChange(e)} />
                        {errors.stock ? <div className={s.error}>{errors.stock}</div> : null}
                    </div>

                    <div className={s.precio}>
                        <h5 className={s.titles}>Precio del elemento</h5>
                        <InputGroup className={s.inputprecio}>
                            <InputGroup.Text className={s.inputpesos} >$</InputGroup.Text>
                            <input type="text"
                                className={s.inputfield}
                                id={s.precioinput}
                                name="price"
                                onChange={(e) => handleInputChange(e)}
                            />
                        </InputGroup>
                        {errors.price ? <div className={s.error}>{errors.price}</div> : null}
                    </div>

                    <div className={s.image}>
                        <h5 className={s.titles}>Foto del elemento</h5>
                        <input
                            type="file"
                            name="image"
                            className={s.fileselect}
                            onChange={uploadImage}
                            accept="image/*" />
                        {loading ? <span class={s.loader}></span> : null}
                    </div>
                    </div>
                    <div className={s.derecha}>
                    <CardSupplie newSupplie={newSupplie} />
                    </div>
                    </div>
                    <div className={s.boton}>
                        {
                            !loading &&
                            !errors.complexId &&
                                !errors.name &&
                                !errors.stock &&
                                !errors.price ?
                                <button className={s.btnVerde} type="submit" 
                                >Siguiente</button> : <button className={s.btnGris} type="submit" disabled >Crear</button>
                        }

                    </div>
                
            </form>
        </div>


    )


}