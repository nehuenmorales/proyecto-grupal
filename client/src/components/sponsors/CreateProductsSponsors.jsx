import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import s from "../Fields/CreateFields/forms.module.css";
import { Select } from "@chakra-ui/react";
import { getAllSponsors,createProduct } from "../../redux/Sponsors/SponsorsActions";
import "./createProduct.css"
import { useToast } from '@chakra-ui/react'


export default function CreateProduct() {
    const dispatch = useDispatch();
    const sponsors =useSelector(state=> state.SponsorsReducer.AllSponsors)
    const toast = useToast()

    useEffect(() => {
      dispatch(getAllSponsors())
    }, []);

  const [newProduct, setNewProduct] = useState({
    name: "",
    link: "",
    image: "",
    description: "",
    sport: "",
    sponsorId: "",
});


  const [errors, setErrors] = useState({
    sponsorId: "Seleccione el nombre del sponsor",
    name: "",
    link: "",
    image: "",
    description: "",
    sport: "",
  });

  const [loading, setLoading] = useState(false);

  const validator = (product) => {
    // funcion que valida que todos los inputs tengan un valor "aceptable"
    let validations = {};
    if (!product.sponsorId) {
      validations.sponsorId = "Seleccione el nombre del sponsor";
    } else if (!product.name) {
      validations.name = "Ingrese un nombre";
    } else if (product.name.length > 30) {
      validations.name = "Superó el máximo de caracteres";
    } else if (!product.link) {
        validations.link = "Ingrese un link";
    }else if (!product.description) {
        validations.description = "Ingrese una description";
    }else if (!product.sport) {
        validations.sport = "Ingrese un deporte";
    }else if (!product.image) {
        validations.image = "Ingrese una imagen";
    }
    return validations;
  };



  const uploadImage = async (e) => {
    const form = new FormData();
    form.append("image", e.target.files[0]);
    console.log(e.target.files);
    const settings = {
      method: "POST",
      timeout: 0,
      processData: false,
      mimeType: "multipart/form-data",
      contentType: false,
      data: form,
    };
    setLoading(true);
    console.log("cargando..", loading);

    const respuesta = await axios(
      "https://api.imgbb.com/1/upload?expiration=600&key=12d5944c0badc6235fe12ec6550754c8",
      settings
    );

    setNewProduct({
      ...newProduct,
      image: respuesta.data.data.url,
    });
    setLoading(false);
  };

  const handleInputChange = (e) => {
    setNewProduct({
        ...newProduct,
        [e.target.name]: e.target.value,
    });
    let errores = validator({ ...newProduct, [e.target.name]: e.target.value });
    setErrors(errores);
}

const handleInputSport = (e) => {
    setNewProduct({ ...newProduct, sports: e.target.value})
    let errors = validator({ ...newProduct, sports:e.target.value});
    setErrors(errors);

}

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProduct(newProduct));
    setNewProduct({
        name: "",
        link: "",
        image: "",
        description: "",
        sport: "",
        sponsorId: "",
      });
    setErrors({
        sponsorId: "Seleccione el nombre del sponsor",
        name: "",
        link: "",
        image: "",
        description: "",
        sport: "",
    });
    document.formAct.reset();
    toast({
        title: 'Producto creado correctamente',
        status: 'success',
        duration: 9000,
        isClosable: true,
    })
  };

  return (
    <div className={s.container}>
      <div className={s.header}>
        <Link to="/">
          <Button className={s.volverbtn}>Volver</Button>
        </Link>
        <div className={s.titleheader}>
          <h3 className={s.titulo}>
            <i>Creando Producto</i>
          </h3>
        </div>
      </div>

      <form name="formAct" onSubmit={(e) => handleSubmit(e)} /*encType='multipart/form-data'*/>
        <div className={s.contenedor}>
          <div className="row d-flex justify-content-center align-items-center px-5">
            <div className="col-md-6 col-sm-12 px-5">
              <div className={s.input}>
                <h5 className={s.titles}>Nombre del sponsor</h5>
                <Select onChange={(e)=>handleInputChange(e)}>
                    {
                        sponsors?.map(elem=>
                            <option name="sport" value={elem.id}>{elem.name}</option>
                            )
                        }
                </Select>
                {errors.sponsorId ? (
                  <div className={s.error}>{errors.sponsorId}</div>
                ) : null}
              </div>
              <div className={s.input}>
                <h5 className={s.titles}>Nombre del producto</h5>
                <input
                  type="text"
                  className={s.inputfield}
                  name="name"
                  onChange={(e) => handleInputChange(e)}
                />
                {errors.name ? (
                  <div className={s.error}>{errors.name}</div>
                ) : null}
              </div>
              <div>
                <h5 className={s.titles}>Descripcion del producto</h5>
                <input
                  className={s.inputfield}
                  type="textarea"
                  name="description"
                  placeholder="Descripción del producto"
                  onChange={(e) => handleInputChange(e)}
                />
                {errors.description ? (
                  <div className={s.error}>{errors.description}</div>
                ) : null}
              </div>
              <div>
                <h5 className={s.titles}>Imagen del producto</h5>
                <input
                  type="file"
                  name="image"
                  className={s.fileselect}
                  onChange={uploadImage}
                  accept="image/*"
                />
                {loading ? <span class={s.loader}></span> : null}
              </div>
            </div>
          </div>
          {/*DEPORTES */}
            <div className='divInputsSport'>
                <h5>Deporte del producto</h5>
                    <div className="deportesElegidos">
                        <div>
                            <select onChange={(e) => handleInputSport(e)} className='selectSports'>
                                <option name='futbol' value='futbol'>Futbol</option>
                                <option name='tenis' value='tenis'>Tenis</option>
                                <option name='padel' value='padel'>Padel</option>
                                <option name='basquet' value='basquet'>Basquet</option>
                            </select>
                        </div>
                    </div>
                    {errors.sport ? <div className="errores">{errors.sport}</div> : null}
            </div>
          {/* BOTON SUBMIT */}
          <div className={s.boton}>
            {!loading &&
            !errors.name &&
            !errors.sponsorId &&
            !errors.link &&
            !errors.image &&
            !errors.sport &&
            !errors.description ? 
                <button type="submit" className='botonActivo'
                >Crear</button> : <button type="submit" className='btnGris' disabled >Crear Producto</button>
            }
          </div>
          
        </div>
      </form>
    </div>
  );
}