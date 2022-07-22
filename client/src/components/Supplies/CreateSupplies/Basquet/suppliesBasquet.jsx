import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createSupplies } from "../../../../redux/OwnerSupplies/suppliesActions";


export default function SuppliesBasquet (){
    const dispatch=useDispatch()

    const [newSupplie,setNewSupplie]=useState({
        name:"", 
        sport:"basquet", 
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
                sport:"basquet", 
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
            <div>
                <form onSubmit={(e)=>handleSubmit(e)} encType='multipart/form-data'>
                    <h4>Nombre</h4>
                    <input
                        type={"text"}
                        onChange={(e)=>handleInputChange(e)}
                        name="name"
                        placeholder="Nombre del producto"
                        
                    />
                    {errors.name ? <div>{errors.name}</div> : null}
                    <h4>Stock</h4>

                    <input
                        type={"text"}
                        onChange={(e)=>handleInputChange(e)}
                        name="stock"
                        placeholder="stock del producto"
                        
                    />
                    {errors.stock ? <div>{errors.stock}</div> : null}
                    <h4>Precio</h4>

                    <input
                    type={"text"}
                    onChange={(e)=>handleInputChange(e)}
                    name="price"
                    placeholder="precio del producto"
                    />
                    {errors.price ? <div>{errors.price}</div> : null}
                    <div>
                    <h3>Imagen de la del Producto</h3>
                    <input
                    name="image"
                    onChange={uploadImage}
                    accept="image/*"
                    type='file'/>
                    </div>
                    {loading?<p>Cargando...</p>:null}
                    <button type="submit" disabled={!loading&&!errors.name && !errors.stock && !errors.price ? false :true } >CREAR  PRODUCTO</button>

                </form>
            </div>
        )

    
}