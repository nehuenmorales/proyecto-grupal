import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import InputGroup from 'react-bootstrap/InputGroup';
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";

export default function CreateComplex() {
  const dispatch = useDispatch()

  const [newComplex, setNewComplex] = useState({
    name: "",
    image: "",
    description: "",
    sports: [],
    adress: ""
  });
  const [errors, setErrors] = useState({
    name: "Debe ingresar un nombre",
    image: "",
    description: "",
    sports: "",
    adress: ""
  });

  const [loading, setLoading] = useState(false)

  const [sports, setSports] = useState([])

  let owner = useSelector((state) => state.getOwnerReducer.owner)
  console.log('soy ownerrr desde crear complejo', owner)

  const validator = (complex) => {// funcion que valida que todos los inputs tengan un valor "aceptable"
    let validations = {};
    const beNumber = /(^\d{1,10}$)/;
    if (!complex.name) {
      validations.name = "Ingrese un nombre"
    } else if (complex.name.length > 30) {
      validations.name = "Superó el máximo de caracteres"
    } else if (!complex.description) {
      validations.description = "Ingrese una descripción de la cancha"
    } else if (complex.description.length > 140) {
      validations.description = "Alcanzó el limite de caracteres"
    } else if (complex.sports.length === 0) {
      validations.sports = "Ingrese un deporte"
    } else if (!complex.adress) {
      validations.adress = "Ingrese una dirección"
    } else if (!complex.image) {
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
  console.log('soy nuevo complejo',newComplex)

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
    console.log('cargando..', loading)

    const respuesta = await axios("https://api.imgbb.com/1/upload?expiration=600&key=12d5944c0badc6235fe12ec6550754c8", settings)

    setNewComplex({
      ...newComplex,
      image: respuesta.data.data.url,
    });
    setLoading(false)

    console.log('soy respuesta img', respuesta.data.data.url);
  };

  const handleInputSport = (e) => {
      console.log(e.target.value, 'soy value')
      if(!sports.includes(e.target.value)){
          setSports([...sports, e.target.value])
          setNewComplex({...newComplex, sports: [...sports, e.target.value]})
      }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    //dispatch(createField(newComplex));
  }

  return (
    <div >
      <div >
        <Link to='/owner/select'>
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
                <h5>Nombre de la cancha</h5>
                <input type="text"
                  name="name"
                  onChange={(e) => handleInputChange(e)} />
                {errors.name ? <div >{errors.name}</div> : null}
              </div>
            <div className='col-md-6 col-sm-12 px-5'>
              {/* DESCRIPCION DE LA CANCHA */}
              <div>
                <h5>Descripcion de la cancha</h5>
                <input
                  type="textarea"
                  name="description"
                  // placeholder="Descripción de la cancha"
                  onChange={(e) => handleInputChange(e)} />

                {errors.description ? <div>{errors.description}</div> : null}
              </div>
              {/*DEPORTES */}
              <div>
              <select onChange={(e) => handleInputSport(e)}>
                  <option value='futbol'>Futbol</option>
                  <option value='tenis'>Tenis</option>
                  <option value='padel'>Padel</option>
                  <option value='basquet'>Basquet</option>
              </select>
              {errors.sports ? <div>{errors.sports}</div> : null}
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
              !errors.image &&
              !errors.adress &&
              !errors.sports ?
              <button type="submit" 
              >Crear</button> : <button type="submit" disabled >Siguiente</button>
            }
            
          </div>
        </div>
      </form>
    </div>
  )
}
