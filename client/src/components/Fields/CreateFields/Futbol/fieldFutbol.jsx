import { useState } from "react";
import { useDispatch } from "react-redux";
import { createField } from "../../../../redux/OwnerFields/fieldsActions";



export default function FutbolFields() {
    const dispatch = useDispatch();
    const [newField, setNewField] = useState({
      name: "",
      sport: "futbol",
      available:"",
      pricePerTurn:"",// falta agregar durationPerTurn
      description: "",
      capacity:"",
      start:"",
      end:""
    });

    const [errors, setErrors] = useState({
        name: "Enter the name of the field.",
        available: "Is it available to use?",
        pricePerTurn: "Enter the price per hour",
        description: "Would be nice if you tell us a little bit of this field",
        capacity: "Enter how many player per team can play in that field. ej: (Futbol) 11,7 ",
        start: "Enter the time range in which the players can play",
        end: "Enter the time range in which the players can play"
      });

      const validator = (e) => {// funcion que valida que todos los inputs tengan un valor "aceptable"
        let validations = {};
        const beNumber = /(^\d{1,10}$)/;
        const property = e.target.name;
        const value = e.target.value;
    
        if (property === "name" && !value) {
          return (validations[property] = "Enter the name of the field.");
        }
        
        if (property === "available" && !value) {
          return (validations[property] = "Choose an option");
        }
        if (property === "pricePerTurn" && !beNumber.test(value) && !value) {
          return (validations[property] =
            "Enter the price per hour, Must be a number");
        }
        if (property === "description" && !value) {
          return (validations[property] =
            "Would be nice if you tell us a little bit of this field");
        }
        if (property === "capacity" && !value && !beNumber.test(value) && value>0 && value<12) {
          return (validations[property] = "Enter how many player per team can play in that field. ej: (Futbol) 11,7 ");
        }
        if (property === "start" && !value) {// aca para abajo magui y lara
          return (validations[property] =
            "Enter the time range in which the players can play");
        }
        if (property === "end" && !value) {
          return (validations[property] =
            "Enter the time range in which the players can play");
        }
        validations[property] = "";
    
        return validations[property];
      };

    const handleInputChange = (e) => {
    console.log(errors);
    if (e.target.name === "pricePerTurn") {
        setNewField({
            ...newField,
            [e.target.name]: parseInt(e.target.value),
        });
    }
    if (e.target.name === "capacity") {
        setNewField({
            ...newField,
            [e.target.name]: parseInt(e.target.value*2),
        });
    }
        setNewField({
            ...newField,
            [e.target.name]: e.target.value,
        });
        // console.log(validator(e));
        // console.log(e.target.value);
        
        setErrors({ ...errors, [e.target.name]: validator(e) });
    }
    

    const hanldeAvailable = (e) => {
        setNewField({
        ...newField,
        available: e.target.value,
        });
        setErrors({ ...errors, [e.target.name]: validator(e) })
    };
    const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createField(newField)); //crear reducer que cree una receta en actions
    console.log(newField);
    setNewField({
        name: "",
        sport: "",
        available:"",
        pricePerTurn:"",
        description: "",
        capacity: "",
        start: "",
        end:""
    });
    alert("Creaste una Cancha!");
    //window.location.href = "/home"; aca nos llevaria al home en caso de que cuando se cree una nueva vaya al home
    //o se quede en la misma pag
    };

    


      return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <h3>Name:</h3>
                    <input
                    type="text"
                    name="name"
                    placeholder="Name of the field"
                    onChange={(e) => handleInputChange(e)}
                    />
                    {errors.name ? <div>{errors.name}</div> : null}
                </div>
                <div>
            <h3>schedule in which you are open</h3>
            <span><h5>Start</h5>
            <input
              type="text"
              name="start"
              placeholder="start"
              onChange={(e) => handleInputChange(e)}
            />
            {errors.start ? <div>{errors.start}</div> : null}
            </span>
            <span>
                <h5>End:</h5>
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
            <h3>Price per hour:</h3>
            <input
              type="text"
              name="pricePerTurn"
              placeholder="pricePerTurn"
              onChange={(e) => handleInputChange(e)}
            />
            {errors.pricePerTurn ? <div>{errors.pricePerTurn}</div> : null}
          </div>
          <div>
            <h3>Description:</h3>
            <input
              type="text"
              name="description"
              placeholder="description"
              onChange={(e) => handleInputChange(e)}
            />
            {errors.description ? <div>{errors.description}</div> : null}
          </div>
          <div>
            <h3>Capacity:</h3>
            <input
              type="text"
              name="capacity"
              placeholder="capacity"
              onChange={(e) => handleInputChange(e)}
            />
            {errors.capacity ? <div>{errors.capacity}</div> : null}
          </div>
          <div>
            <h3>Is it available to use Right now?</h3>
            <form>
              <input
                type="button"
                value="true"
                name="true"
                onClick={(e) => hanldeAvailable(e)}
              />
              Yes
              <input
                type="button"
                value="false"
                name="false"
                onClick={(e) => hanldeAvailable(e)}
              />
              No
            </form>
            {errors.available ? <div>{errors.available}</div> : null}

          </div>
          {!Object.values(errors).length ? (// 
            <button type="submit">CREATE FIELD</button>
          ) : <button type="submit" disabled>CREATE FIELD</button>}
        </form>
        </div>
      )
}
