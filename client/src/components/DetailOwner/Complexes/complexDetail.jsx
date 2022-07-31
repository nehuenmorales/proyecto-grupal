import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { getComplexDetail } from "../../../redux/OwnerComplex/ComplexDetailOwner/ComplexDetailAction";
import { Link } from 'react-router-dom'
import Button from "react-bootstrap/esm/Button";
import './complexDetail.css'
import { modifyComplex } from "../../../redux/OwnerComplex/ModifyComplex/modifyComplexAction";
import swal from 'sweetalert';
import { useHistory } from "react-router-dom";

export default function ComplexDetail({id}){
    const dispatch = useDispatch()
    let complex = useSelector((state) => state.complexDetailReducer.complexDetail)
    const [change, setChange] = useState({
        description: '',
        sports: []
    })
    const [errors, setErrors] = useState({
        description: "",
        sports: "",
    });

    console.log('soy complex', complex)
    console.log('change', change)
    const history = useHistory()

    console.log(id)
    useEffect(() => {
        dispatch(getComplexDetail(id))
    },[])
    useEffect(() => {
        setChange({description: complex?.description, sports: complex?.sports})        
    },[complex])

    const onClick = (ev) => {
        ev.preventDefault()
        if(ev.target.name === 'description'){
        setChange({...change, [ev.target.name]: ev.target.value})
        } else {
            if(!change.sports.includes(ev.target.value)){
            setChange({...change, sports: [...change.sports, ev.target.value]})
            }
        }
        let errores = validator({ ...change, [ev.target.name]: ev.target.value });
        setErrors(errores);
    }

    const validator = (change) => {// funcion que valida que todos los inputs tengan un valor "aceptable"
        let validations = {};
         if (!change.description) {
            validations.description = "Ingrese una descripción del complejo"
        } else if (change.description?.length > 140) {
            validations.description = "Alcanzó el limite de caracteres"
        }  else if (change.sports?.length == 0) {
            validations.sports = "Ingrese un deporte"
        } 
        return validations;
    };



    const handleSubmit = (ev) => {
        ev.preventDefault()
        dispatch(modifyComplex(change, id))
        swal('', "Complejo modificado exitosamente!", 'success')
        history.push("/")
        
    }
    const eliminarDeporte = (ev) => {
        ev.preventDefault()
        setChange({...change, sports: change.sports.filter((elem) => {
            return elem !== ev.target.value
        })})
        let errores = validator({ ...change, sports: change.sports.filter((elem) => {
            return elem !== ev.target.value
        }) });
        setErrors(errores);
        
    }
     return(
         <div className="contenedorDetail">
            <div className='izquierda'>
              <Link to='/' style={{ 'padding': '10px' , 'width': '25%', 'margin': '20px 10px 10px 10px'}}>
                    <Button style={{'marginTop': '15px'}}>Volver</Button>
                </Link>
                <div className="tituloName">
                <h2 className="fw-normal text-white fst-italic m-9" style={{fontSize: '3em', marginLeft: '35%'}}>{complex.name}</h2>
                </div>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className='contenedorLapiz'>
                <p className="subTitulos">Descripción</p>
                <img src='https://cdn-icons-png.flaticon.com/512/1250/1250615.png' className='lapiz'></img>
                </div>
             <textarea className="infoForm" name='description' onChange={ev => onClick(ev)} value={change.description}/>
             {errors.description ? <div className="errores" style={{marginLeft:'80px'}}>{errors.description}</div> : null}
             <p className="subTitulos">Dirección</p>
             <p className="info">{complex.address}</p>
             <div className='contenedorLapiz'>
             <p className="subTitulos">Deportes</p>
             <img src='https://cdn-icons-png.flaticon.com/512/1250/1250615.png' className='lapiz'></img>
                </div>
                <div className='contenedorDeporte'>
                    <div>
            <select name="sports" onChange={ev => onClick(ev)} className='selectSports'>
                <option name="sports" value="futbol">Futbol</option>
                <option name="sports" value="padel">Padel</option>
                <option name="sports" value="tenis">Tenis</option>
                <option name="sports" value="basquet">Basquet</option>
            </select>
            </div>
            <div className='mapeoSport'>
             {change.sports?.map((elem) => {
                 return(
                    <button value={elem} className='elem'onClick={ev => eliminarDeporte(ev)}>{elem.charAt(0).toUpperCase() + elem.slice(1)}</button>
                 )
             })}
             </div>
             {errors.sports ? <div className="errores" style={{marginTop:'40px'}}>{errors.sports}</div> : null}
             </div>
             <div className='contenedorBoton'>
                        {
                                !errors.description &&
                                !errors.sports &&
                                change.description !== complex.description || change.sports !== complex.sports ?
                                <button type="submit" className='botonActivo'
                                >Guardar cambios</button> : <button type="submit" className='btnGris' disabled >Guardar cambios</button>
                        }

                    </div>
             </form>
            </div>
            <div style={{backgroundImage: `url(${complex.image})`}} className='derecha'>
                <div className='div-rating'  style={{backgroundColor: `rgba(17, 24, 37, 1)`, padding: '7px 15px 3px', height: '50px', width: '150px'}}>
                <img src="https://api.iconify.design/material-symbols:star-rounded.svg?color=%23ffee00" alt="" className="rating-img" style={{height: `28px`}}/>
                <p className="complex-rating" style={{fontSize: `1.3em`, textShadow: '1px 1px 3px black;'}}> {complex.rating}</p>
                </div>
             </div>
         </div>
    )
}