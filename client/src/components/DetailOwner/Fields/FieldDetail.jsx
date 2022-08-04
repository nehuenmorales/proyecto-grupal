import React from "react";
import './FieldDetail.css'
import { Link } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFieldDetail } from "../../../redux/OwnerFields/FieldDetailOwner/FieldDetailAction"
import swal from 'sweetalert';
import { useHistory } from "react-router-dom";
import { modifyField } from "../../../redux/OwnerFields/ModifyField/modifyFieldAction"

export default function FieldDetail({ id }) {
    const dispatch = useDispatch();
    let field = useSelector((state) => state.fieldDetailReducer.fieldDetail)
    console.log(field, 'soy yoooo')
    useEffect(() => {
        dispatch(getFieldDetail(id));
    }, [])

    const cambioHora = (num) => {
        if (num >= 24) {
            num = num - 24
            let numero = num.toString()
            if (!numero.includes('.')) {
                return numero + ':00'
            } else {
                let resultado = numero.replace('.5', ':30')
                return resultado
            }
        }
        let numero = num.toString()
        if (!numero.includes('.')) {
            return numero + ':00'
        } else {
            let resultado = numero.replace('.5', ':30')
            return resultado
        }
    }

    useEffect(() => {
        if (field) {
            setChange({
                description: field?.description,
                pricePerTurn: field?.pricePerTurn,
                durationPerTurn: cambioHora(field?.durationPerTurn),
                start: cambioHora(field?.start),
                end: cambioHora(field?.end),
            })
        }

    }, [field])



    const [change, setChange] = useState({
        description: '',
        pricePerTurn: '',
        durationPerTurn: '',
        start: '',
        end: ''
    })

    const [errors, setErrors] = useState({
        description: '',
        pricePerTurn: '',
        durationPerTurn: '',
        start: '',
        end: ''
    });

    const validator = (change) => {// funcion que valida que todos los inputs tengan un valor "aceptable"
        let validations = {};
        if (!change.description) {
            validations.description = "Ingrese una descripción del complejo"
        } else if (change.description?.length > 140) {
            validations.description = "Alcanzó el limite de caracteres"
        } else if (!change.pricePerTurn) {
            validations.pricePerTurn = "Ingrese el precio del turno"
        } else if (!change.durationPerTurn) {
            validations.durationPerTurn = "Ingrese la duracion del turno"
        } else if (!change.start) {
            validations.start = "Ingrese el horario de apertura de la cancha"
        } else if (!change.end) {
            validations.end = "Ingrese el horario de cierre de la cancha"
        }
        return validations;
    };

    const onClick = (ev) => {
        ev.preventDefault()
        setChange({ ...change, [ev.target.name]: ev.target.value })

        let errores = validator({ ...change, [ev.target.name]: ev.target.value });
        setErrors(errores);
    }
    console.log('soy change', change)
    const history = useHistory()
    const handleSubmit = (ev) => {
        ev.preventDefault()
        dispatch(modifyField(change, id))
        swal('', "Cancha modificada exitosamente!", 'success')
        history.push("/fieldOwner")
    }

    return (
        <div className="contenedorDetail">
            <div className='izquierda'>
                <Link to='/fieldOwner' style={{ 'padding': '10px', 'width': '25%', 'margin': '20px 10px 10px 10px' }}>
                    <Button style={{ 'marginTop': '15px' }}>Volver</Button>
                </Link>

                <div className="tituloName">
                    <h2 className="fw-normal text-white fst-italic m-9" style={{ fontSize: '3em', marginLeft: '35%' }}>{field.name}</h2>
                    <h5 className="fw-normal text-white fst-italic m-9" style={{ fontSize: '1.5em', marginLeft: '35%' }}>{field.complexId}</h5>
                </div>

                <form onSubmit={(e) => handleSubmit(e)} >
                    <div className='contenedorLapiz'>
                        <p className="subTitulos">Descripción</p>
                        <img src='https://cdn-icons-png.flaticon.com/512/1250/1250615.png' className='lapiz'></img>
                    </div>
                    <textarea className="infoForm" name='description' onChange={ev => onClick(ev)} value={change.description} />
                    {errors.description ? <div className="errores" style={{ marginLeft: '80px' }}>{errors.description}</div> : null}
                    <div className='contenedorLapiz'>
                        <p className="subTitulos">Capacidad total de jugadores</p>
                        <img src='https://cdn-icons-png.flaticon.com/512/1250/1250615.png' className='lapiz'></img>
                    </div>
                    <input className="infoForm" name='capacity' /*onChange={ev => onClick(ev)} */ value={field.capacity} />

                    <div className='contenedorLapiz'>
                        <p className="subTitulos">Precio por turno</p>
                        <img src='https://cdn-icons-png.flaticon.com/512/1250/1250615.png' className='lapiz'></img>
                    </div>
                    <input className="infoForm" name='pricePerTurn' onChange={ev => onClick(ev)} value={`${change.pricePerTurn}`} />
                    {errors.pricePerTurn ? <div className="errores" style={{ marginLeft: '80px' }}>{errors.pricePerTurn}</div> : null}

                    <div className='contenedorLapiz'>
                        <p className="subTitulos">Horario de apertura de la cancha</p>
                        <img src='https://cdn-icons-png.flaticon.com/512/1250/1250615.png' className='lapiz'></img>
                    </div>
                    <input type='time' className="infoForm" name='start' onChange={ev => onClick(ev)} value={`${change.start}`} />
                    {errors.start ? <div className="errores" style={{ marginLeft: '80px' }}>{errors.start}</div> : null}

                    <div className='contenedorLapiz'>
                        <p className="subTitulos">Horario de cierre de la cancha</p>
                        <img src='https://cdn-icons-png.flaticon.com/512/1250/1250615.png' className='lapiz'></img>
                    </div>
                    <input type='time' className="infoForm" name='end' onChange={ev => onClick(ev)} value={`${change.end}`} />
                    {errors.end ? <div className="errores" style={{ marginLeft: '80px' }}>{errors.end}</div> : null}

                    <div className='contenedorLapiz'>
                        <p className="subTitulos">Duración por turno</p>
                        <img src='https://cdn-icons-png.flaticon.com/512/1250/1250615.png' className='lapiz'></img>
                    </div>
                    <input type='time' className="infoForm" name='durationPerTurn' onChange={ev => onClick(ev)} value={`${change.durationPerTurn}`} />
                    {errors.durationPerTurn ? <div className="errores" style={{ marginLeft: '80px' }}>{errors.durationPerTurn}</div> : null}

                    <div className='contenedorLapiz'>
                        <p className="subTitulos">Deporte</p>
                        <img src='https://cdn-icons-png.flaticon.com/512/1250/1250615.png' className='lapiz'></img>
                    </div>
                    <input className="infoForm" name='sport' /*onChange={ev => onClick(ev)} */ value={field.sport} />

                    <div className='contenedorBoton'>
                        {
                            !errors.description &&
                                !errors.pricePerTurn &&
                                !errors.durationPerTurn &&
                                !errors.start &&
                                !errors.end &&
                                change.description !== field.description || change.pricePerTurn !== field.pricePerTurn || change.durationPerTurn !== field.durationPerTurn || change.start !== field.start || change.end !== field.end ?
                                <button type="submit" className='botonActivo'
                                >Guardar cambios</button> : <button type="submit" className='btnGris' disabled >Guardar cambios</button>
                        }
                    </div>
                </form>
            </div>
            <div style={{ backgroundImage: `url(${field.image})` }} className='derecha'>
                <div className='div-rating' style={{ backgroundColor: `rgba(17, 24, 37, 1)`, padding: '7px 15px 3px', height: '50px', width: '150px' }}>
                    <div className="complex-rating" /*style={{ fontSize: `1.3em`, textShadow: '1px 1px 3px black;' }}*/> {
                        field.available === 'true' ?
                            <div>
                                <p style={{ fontSize: `1.3em`, textShadow: '1px 1px 3px black;' }}>Disponible</p>
                                <img src="https://cdn-icons-png.flaticon.com/512/190/190411.png" alt="" style={{ height: `28px` }} />
                            </div>
                            :
                            <div>
                                <p style={{ fontSize: `1.3em`, textShadow: '1px 1px 3px black;' }}>Actualmente no disponible</p>
                                <img src="https://cdn-icons.flaticon.com/png/512/1008/premium/1008927.png?token=exp=1659572730~hmac=56f58e38a6705cd818eb3ada627fc3df" alt="" style={{ height: `28px` }} />
                            </div>

                    }</div>
                </div>
            </div>


        </div>

    )
}