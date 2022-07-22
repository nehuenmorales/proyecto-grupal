import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createSupplies } from "../../../../redux/OwnerSupplies/suppliesActions";
import s from "../formsSupplies.module.css"
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';




export default function SuppliesFutbol (){
    const dispatch=useDispatch()

    const [newSupplie,setNewSupplie]=useState({
        name:"", 
        sport:"futbol", 
        stock:"", 
        price:"",
        image:""
    })
    const [errors,setErrors]=useState({
        name:"Ingrese el nombre del producto", 
        sport:"", 
        stock:"", 
        price:""
    })
    const [loading,setLoading]=useState(false)
    const validator = (supplies) => {// funcion que valida que todos los inputs tengan un valor "aceptable"
        let validations = {};
        const beNumber = /(^\d{1,10}$)/;
        if(!supplies.name){
          validations.name = "Ingrese el nombre del producto"
        }else if(supplies.name.length>30){
          validations.name = "Superó el máximo de caracteres"
        }else if(!supplies.stock){
          validations.stock = "Ingrese el stock del producto"
        }else if(!beNumber.test(supplies.stock)){
          validations.stock = "Ingrese solo números"
        }else if(!supplies.price){
          validations.price = "Ingrese el precio del producto"
        }else if(!beNumber.test(supplies.price)){
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
        }else{
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
                name:"", 
                sport:"futbol", 
                stock:"", 
                price:"",
                image:""
            });
            alert("creaste la un instrumento")
            
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
            console.log('soy respuesta img',respuesta);
            };

        return (
            <div className={s.background}>
                <form onSubmit={(e)=>handleSubmit(e)} encType='multipart/form-data'>
                <FloatingLabel
                    controlId="floatingInput"
                    label="Nombre del producto"
                    className={s.inputfield}
                >
                    <Form.Control type="text"
                    name="name"
                    placeholder="Nombre del producto"
                    onChange={(e) => handleInputChange(e)} />
                </FloatingLabel>
                    
                    {errors.name ? <div className={s.error}>{errors.name}</div> : null}
                    <FloatingLabel
                    controlId="floatingInput"
                    label="stock del producto"
                    className={s.inputfield}
                >
                    <Form.Control type="text"
                    name="stock"
                    placeholder="stock del producto"
                    onChange={(e) => handleInputChange(e)} />
                </FloatingLabel>
                    
                    
                    {errors.stock ? <div className={s.error}>{errors.stock}</div> : null}
                    <FloatingLabel
                    controlId="floatingInput"
                    label="precio del producto"
                    className={s.inputfield}
                >
                    <Form.Control type="text"
                    name="price"
                    placeholder="precio del producto"
                    onChange={(e) => handleInputChange(e)} />
                </FloatingLabel>
                    
                    
                    {errors.price ? <div className={s.error}>{errors.price}</div> : null}
                    <div>
                    <h3 className={s.titles}>Imagen de la del Producto</h3>
                    <input
                    name="image"
                    onChange={uploadImage}
                    accept="image/*"
                    type='file'/>
                    </div>
                    {loading?<p>Cargando...</p>:null}
                    <Button  variant="success" size="lg" type="submit" disabled={!loading&&!errors.name && !errors.stock && !errors.price ? false :true } >CREAR  PRODUCTO</Button>

                </form>
            </div>
        )

    
}