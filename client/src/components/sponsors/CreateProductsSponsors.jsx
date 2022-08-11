import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import { Select } from "@chakra-ui/react";
import { getAllSponsors, createProduct } from "../../redux/Sponsors/SponsorsActions";
import s from "./createProduct.module.css"
import { useToast } from '@chakra-ui/react'
import { useHistory } from "react-router-dom";


export default function CreateProduct() {
  const dispatch = useDispatch();
  const sponsors = useSelector(state => state.SponsorsReducer.AllSponsors)
  const toast = useToast()
  const history = useHistory()

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
    } else if (!product.description) {
      validations.description = "Ingrese una description";
    } else if (!product.sport) {
      validations.sport = "Ingrese un deporte";
    } else if (!product.image) {
      validations.image = "Ingrese una imagen";
    }
    return validations;
  };

  const upload = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", 'sdujndiw');
    setLoading(true)
    const response = await fetch(`https://api.cloudinary.com/v1_1/dttguisff/upload`,
        { method: "POST", body: data })
    const data1 = await response.json()
    setNewProduct({
        ...newProduct,
        image: data1.url,
    });
    let errors = validator({ ...newProduct, image: file });
    setErrors(errors);
    setLoading(false)
};


  const handleInputChange = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
    let errores = validator({ ...newProduct, [e.target.name]: e.target.value });
    setErrors(errores);

  }

  // const handleInputSport = (e) => {
  //     setNewProduct({ ...newProduct, sport: e.target.value})
  //     let errors = validator({ ...newProduct, sport:e.target.value});
  //     setErrors(errors);

  // }

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
    history.push("/")
  };

  return (
    <div className={s.container}>
      <div className={s.header}>
        <Link to="/">
          <Button className={s.volverbtn}>Volver</Button>
        </Link>

      </div>

      <form name="formAct" onSubmit={(e) => handleSubmit(e)} style={{width:'100%'}} >
        <div className={s.titulo}>
          <h3 className="fw-normal text-white fst-italic m-9" style={{ fontSize: '1em' }}>Creando Producto</h3>
        </div>
        {/* <div className={s.contenedor}> */}
        <div className="contenedorInputs" style={{display:'flex', flexDirection: 'row', justifyContent: 'space-around', width:'100%'}}>

          <div className='inputss-izquierda'>

            <div className={s.input}>
              <p className={s.titles} style={{ color: 'rgba(18, 141, 255, 1)', fontSize: '20px', fontWeight: '600', marginTop: '30px' }}>Nombre del sponsor</p>
              <Select placeholder="Sponsor" name="sponsorId" onChange={(e) => handleInputChange(e)} className='selectSports' style={{backgroundColor:'white', color:'black'}} >
                {
                  sponsors?.map(elem =>
                    <option name="sport" value={elem.id} style={{color: 'black'}}>{elem.name}</option>
                  )
                }
              </Select>
              {errors.sponsorId ? (
                <div className={s.error}>{errors.sponsorId}</div>
              ) : null}
            </div>
            <div className={s.input}>
              <p className={s.titles} style={{ color: 'rgba(18, 141, 255, 1)', fontSize: '20px', fontWeight: '600', marginTop: '30px' }}>Nombre del producto</p>
              <input
                type="text"
                
                name="name"
                onChange={(e) => handleInputChange(e)}
                style={{width: '350px', height:'40px', borderRadius:'10px', color:'black', paddingLeft:'5px'}}


              />
              {errors.name ? (
                <div className={s.error}>{errors.name}</div>
              ) : null}
            </div>
            <div className={s.input}>
              <p className={s.titles} style={{ color: 'rgba(18, 141, 255, 1)', fontSize: '20px', fontWeight: '600', marginTop: '30px' }}>Link del producto</p>
              <input
                type="text"
                name="link"
                onChange={(e) => handleInputChange(e)}
                style={{width: '350px', height:'40px', borderRadius:'10px', color:'black', paddingLeft:'5px'}}

              />
              {errors.link ? (
                <div className={s.error}>{errors.link}</div>
              ) : null}
            </div>
          </div>
          <div className='inputss-derecha'>
            {/*DEPORTES */}
            <div >
              <p style={{ color: 'rgba(18, 141, 255, 1)', fontSize: '20px', fontWeight: '600', marginTop: '30px' }}>Deporte del producto</p>
              <div style={{marginTop:'5px'}}>
               
                  <Select placeholder="Deporte" name="sport" onChange={(e) => handleInputChange(e)} className='selectSports' style={{backgroundColor:'white', color:'black'}}>
                    <option name='futbol' value='futbol' style={{color: 'black'}}>Futbol</option>
                    <option name='tenis' value='tenis' style={{color: 'black'}}>Tenis</option>
                    <option name='padel' value='padel' style={{color: 'black'}}>Padel</option>
                    <option name='basquet' value='basquet' style={{color: 'black'}}>Basquet</option>
                  </Select>
                
              </div>
              {errors.sport ? <div className="errores">{errors.sport}</div> : null}
            </div>
            <p style={{ color: 'rgba(18, 141, 255, 1)', fontSize: '20px', fontWeight: '600', marginTop: '30px' }} className={s.titles}>Descripcion del producto</p>
            <input
              type="textarea"
              name="description"
              onChange={(e) => handleInputChange(e)}
              style={{width: '350px', height:'40px', borderRadius:'10px', color:'black', paddingLeft:'5px'}}

            />
            {errors.description ? (
              <div className={s.error}>{errors.description}</div>
            ) : null}

            <div style={{display:'flex', flexDirection:'column'}}>
              <p style={{ color: 'rgba(18, 141, 255, 1)', fontSize: '20px', fontWeight: '600', marginTop: '30px' }} className={s.titles}>Imagen del producto</p>
              {/* <input
                type="file"
                name="image"
                className='inputImage'
                onChange={uploadImage}
                accept="image/*"
              /> */}
              <input type="file" name='image' className="inputImage" onChange={(e) => upload(e.target.files[0])}></input>
              {loading ? <span style={{marginTop:'10px'}} class={s.loader}></span> : null}
            </div>


            {/* BOTON SUBMIT */}
          </div>
        </div>
            <div className={s.boton}>
              {!loading &&
                !errors.name &&
                !errors.sponsorId &&
                !errors.link &&
                !errors.image &&
                !errors.sport &&
                !errors.description ?
                <button type="submit" className={s.botonActivo} style={{marginTop:'40px', paddingTop:'7px', paddingBottom:'7px'}}
                >Publicar producto</button> : <button style={{marginTop:'40px',  paddingTop:'7px', paddingBottom:'7px'}} type="submit" className={s.btnGris} disabled >Publicar producto</button>
              }
            </div>
      </form>
    </div>
  );
}