import { useState } from "react";
import axios from "axios";
import ModalsFieldsGames from "../../ModalsFieldsGames/ModalFieldsGames";


export default function PadelFields() {
    
    const [newField, setNewField] = useState({
      name: "",
      sport: "padel",
      available:"",
      pricePerTurn:"",
      durationPerTurn:"",
      description: "",
      capacity:4,
      start:"",
      end:""
    });

    const [showModal, setShowModal] = useState(false)


    const [errors, setErrors] = useState({
        name: "Debe ingresar un nombre",
        available: "",
        pricePerTurn: "",
        durationPerTurn:"",
        description: "",
        start: "",
        end: ""
      });
      const [loading, setLoading] = useState(false)
      
      const validator = (field) => {// funcion que valida que todos los inputs tengan un valor "aceptable"
        let validations = {};
        const beNumber = /(^\d{1,10}$)/;
        if(!field.name){
          validations.name = "Ingrese un nombre"
        }else if(field.name.length>30){
          validations.name = "Superó el máximo de caracteres"
        }else if(!field.start){
          validations.start = "Ingrese el horario de apertura"
        }else if(field.start < 0 || field.start > 24){
          validations.start = "Ingrese un horario válido"
        }else if(!field.end){
          validations.end = "Ingrese el horario de cierre"
        }else if(field.end<0 || field.end>24){
          validations.end = "Ingrese un horario válido"
        }else if(!field.pricePerTurn){
          validations.pricePerTurn = "Ingrese un precio por turno"
        }else if(!beNumber.test(field.pricePerTurn)){
          validations.pricePerTurn = "Ingrese solo números"
        }else if(!field.durationPerTurn){
          validations.durationPerTurn = "Ingrese la duración del turno"
        }else if(!field.description){
          validations.description = "Ingrese una descripción de la cancha"
        } else if(field.description.length > 140){
          validations.description = "Alcanzó el limite de caracteres"
        }else if(!field.available){
          validations.available = "Indique si la cancha esta disponible"
        }
        return validations;
      };

      const handleInputChange = (e) => {
    
        if (e.target.name === "pricePerTurn") {
            setNewField({
                ...newField,
                [e.target.name]: parseInt(e.target.value),
            });
        }if(e.target.name==="start" || e.target.name==="end" || e.target.name==="durationPerTurn"){
          let hour=e.target.value.slice(0,2)
          let minutes=e.target.value.slice(3,6)
          minutes=minutes/60
          let timeNumber=parseInt(hour)+parseFloat(minutes)
          setNewField({
            ...newField,
            [e.target.name]: timeNumber,
          })
        }
        else{
            setNewField({
                ...newField,
                [e.target.name]: e.target.value,
            });
            // console.log(validator(e));
            // console.log(e.target.value);
        }
        let errors = validator({ ...newField, [e.target.name]: e.target.value });
        setErrors(errors);
           
            console.log(newField)
        }
    

    const handleAvailable = (e) => {
        console.log(e.target.value)
        setNewField({
        ...newField,
        available: e.target.value,
        });
        setErrors({ ...errors, available:"" })
        
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
      console.log('cargando..',loading)
      
      const respuesta = await axios("https://api.imgbb.com/1/upload?expiration=600&key=12d5944c0badc6235fe12ec6550754c8", settings)
  
      setNewField({
        ...newField,
        image: respuesta.data.data.url,
      });
      setLoading(false)
  
      console.log('soy respuesta img',respuesta.data.data.url);
    };

    const handleModal = (e)=>{
      e.preventDefault();
      setShowModal(true)
    }

      return (
        <div>
            <form onSubmit={(e) => handleModal(e)} /*encType='multipart/form-data'*/>
                <div>
                    <h3>Nombre</h3>
                    <input
                    type="text"
                    name="name"
                    placeholder="Nombre de la cancha"
                    onChange={(e) => handleInputChange(e)}
                    />
                    {errors.name ? <div>{errors.name}</div> : null}
                </div>
                <div>
                <h3>Horario de la cancha</h3>
            <span><h5>Apertura:</h5>
            <input
              type="time"
              name="start"
              placeholder="apretura"
              onChange={(e) => handleInputChange(e)}
            />
            {errors.start ? <div>{errors.start}</div> : null}
            </span>
            <span>
                <h5>Cierre</h5>
                <input
                type="time"
                name="end"
                placeholder="cierre"
                onChange={(e) => handleInputChange(e)}
            />
                {errors.end ? <div>{errors.end}</div> : null}
            </span>
          </div>
          <div>
            <h3>Precio por turno</h3>
            <input
              type="text"
              name="pricePerTurn"
              placeholder="precio por turno"
              onChange={(e) => handleInputChange(e)}
            />
            {errors.pricePerTurn ? <div>{errors.pricePerTurn}</div> : null}
          </div>
          <div>
            <h3>Duración por turno</h3>
            <input
              type="time"
              name="durationPerTurn"
              placeholder="duracion por turno"
              onChange={(e) => handleInputChange(e)}
            />
            {errors.durationPerTurn ? <div>{errors.durationPerTurn}</div> : null}
          </div>
          <div>
            <h3>Descripción</h3>
            <input
              type="text"
              name="description"
              placeholder="descripcion"
              onChange={(e) => handleInputChange(e)}
            />
            {errors.description ? <div>{errors.description}</div> : null}
          </div>
          
          <div>
            <h3>¿Esta disponible para usar?</h3>
            
            <button
                type="button"
                value="true"
                name="true"
                onClick={(e) => handleAvailable(e)}
              >Disponible</button>
              <button
                type="button"
                value="false"
                name="false"
                onClick={(e) => handleAvailable(e)}
              >No disponible</button>
              
            
            {errors.available ? <div>{errors.available}</div> : null}

          </div>
          <div>
            <h3>Imagen de la cancha</h3>
            <input
            name="image"
            onChange={uploadImage}
            accept="image/*"
            type='file'
            
          />
          {loading ? <p>Cargando...</p> : null}
          </div>
          <button type="submit" disabled={!loading && !errors.name && !errors.durationPerTurn && !errors.start && !errors.end && !errors.available && !errors.pricePerTurn && !errors.description ? false :true } >CREATE FIELD</button>
        </form>
        <ModalsFieldsGames showModal={showModal} setShowModal={setShowModal} setNewField={setNewField} sport={newField.sport} newField={newField} />
        </div>
      )
}
