import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createField } from "../../../../redux/OwnerFields/fieldsActions";



export default function FutbolFields() {
    const dispatch = useDispatch();
    const [newField, setNewField] = useState({
      name: "",
      sport: "futbol",
      available:"",
      pricePerTurn:"",
      durationPerTurn:"",
      description: "",
      capacity:"",
      start:"",
      end:""
    });

    const [errors, setErrors] = useState({
        name: "Debe ingresar un nombre",
        available: "",
        pricePerTurn: "",
        durationPerTurn:"",
        description: "",
        capacity: "",
        start: "",
        end: ""
      });
      
      const validator = (field) => {// funcion que valida que todos los inputs tengan un valor "aceptable"
        let validations = {};
        const beNumber = /(^\d{1,10}$)/;
        if(!field.name){
          validations.name = "Ingrese un nombre"
        }else if(field.name.length>30){
          validations.name = "Superó el máximo de caracteres"
        }else if(!field.start){
          validations.start = "Ingrese el horario de apertura"
        }else if(!beNumber.test(field.start)){
          validations.start = "Ingrese solo numeros"
        }else if(field.start < 0 || field.start > 24){
          validations.start = "Ingrese un horario válido"
        }else if(!field.end){
          validations.end = "Ingrese el horario de cierre"
        }else if(!beNumber.test(field.end)){
          validations.end = "Ingrese solo números"
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
        }else if(!field.capacity){
          validations.capacity = "Ingrese la cantidad de jugadores totales de la cancha"
        }else if(!beNumber.test(field.capacity)){
          validations.capacity = "Ingrese solo numeros"
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
    }
    if (e.target.name === "capacity") {
        
        setNewField({
            ...newField,
            [e.target.name]: parseInt(e.target.value)*2,
        });
    }else{
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
    const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createField(newField)); 
    console.log(newField);
    setNewField({
        name: "",
        sport: "futbol",
        available:"",
        pricePerTurn:"",
        durationPerTurn:"",
        description: "",
        capacity: "",
        start: "",
        end:""
    });
    alert("creaste la cancha")
    
    //window.location.href = "/home"; aca nos llevaria al home en caso de que cuando se cree una nueva vaya al home
    //o se quede en la misma pag
    };

    


      return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <h3>Nombre</h3>
                    <input
                    type="text"
                    name="name"
                    placeholder="Name of the field"
                    onChange={(e) => handleInputChange(e)}
                    />
                    {errors.name ? <div>{errors.name}</div> : null}
                </div>
                <div>
            <h3>Horario de la cancha</h3>
            <span><h5>Apertura</h5>
            <input
              type="text"
              name="start"
              placeholder="start"
              onChange={(e) => handleInputChange(e)}
            />
            {errors.start ? <div>{errors.start}</div> : null}
            </span>
            <span>
                <h5>Cierre</h5>
                <input
                type="text"
                name="end"
                placeholder="end"
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
              placeholder="pricePerTurn"
              onChange={(e) => handleInputChange(e)}
            />
            {errors.pricePerTurn ? <div>{errors.pricePerTurn}</div> : null}
          </div>
          <div>
            <h3>Duracion por turno</h3>
            <input
              type="time"
              name="durationPerTurn"
              placeholder="durationPerTurn"
              onChange={(e) => handleInputChange(e)}
            />
            {errors.durationPerTurn ? <div>{errors.durationPerTurn}</div> : null}
          </div>
          <div>
            <h3>Description</h3>
            <input
              type="text"
              name="description"
              placeholder="description"
              onChange={(e) => handleInputChange(e)}
            />
            {errors.description ? <div>{errors.description}</div> : null}
          </div>
          <div>
            <h3>Capacidad</h3>
            <input
              type="text"
              name="capacity"
              placeholder="capacity"
              onChange={(e) => handleInputChange(e)}
            />
            {errors.capacity ? <div>{errors.capacity}</div> : null}
          </div>
          <div>
            <h3>¿Está disponible para usar?</h3>
            
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
          <button type="submit" disabled={!errors.name && !errors.durationPerTurn && !errors.start && !errors.end && !errors.available && !errors.pricePerTurn && !errors.capacity && !errors.description ? false :true } >CREAR C</button>
        </form>
        </div>
      )
}
