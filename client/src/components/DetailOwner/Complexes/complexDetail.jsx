import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { getComplexDetail } from "../../../redux/OwnerComplex/ComplexDetailOwner/ComplexDetailAction";
import { Link } from 'react-router-dom'
import Button from "react-bootstrap/esm/Button";
import './complexDetail.css'
import { modifyComplex } from "../../../redux/OwnerComplex/ModifyComplex/modifyComplexAction";

export default function ComplexDetail({id}){
    const dispatch = useDispatch()
    let complex = useSelector((state) => state.complexDetailReducer.complexDetail)
    const [change, setChange] = useState({
        description: '',
        sports: []
    })
    console.log('soy complex', complex)
    console.log('change', change)

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
    }
    const handleSubmit = (ev) => {
        ev.preventDefault()
        dispatch(modifyComplex(change, id))
        
    }
    const eliminarDeporte = (ev) => {
        ev.preventDefault()
        setChange({...change, sports: change.sports.filter((elem) => {
            return elem !== ev.target.value
        })})
        
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
                <p className="subTitulos">Descripción</p>
             <input className="info" placeholder={complex.description} name='description' onChange={ev => onClick(ev)} value={change.description}/>
             <p className="subTitulos">Dirección</p>
             <p className="info">{complex.address}</p>
             <p className="subTitulos">Deportes</p>
            <select name="sports" onChange={ev => onClick(ev)}>
                <option name="sports" value="futbol">Futbol</option>
                <option name="sports" value="padel">Padel</option>
                <option name="sports" value="tenis">Tenis</option>
                <option name="sports" value="basquet">Basquet</option>
            </select>
             <p className="info">{change.sports?.map((elem) => {
                 return(
                     <div>
                         <p>{elem.charAt(0).toUpperCase() + elem.slice(1)}</p>
                         <button value={elem} onClick={ev => eliminarDeporte(ev)}>x</button>
                     </div>
                 )
             })}</p>
             <button>Guardar cambios</button>
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