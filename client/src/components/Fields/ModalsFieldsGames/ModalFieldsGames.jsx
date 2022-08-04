import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from "react-redux";
import { createGame } from "../../../redux/Games/gamesAction.js";
import { useHistory } from "react-router-dom";
import s from './modals.module.css'
import swal from 'sweetalert';
import axios from 'axios'

export default function ModalsFieldsGames({ showModal, setShowModal, setNewField, newField, sport, convertirTime, fieldId, type }) {
    let dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
    const dispatch = useDispatch();
    const field = useSelector((state) => state.fieldsReducer.field)
    const [indice, setIndice] = useState(0)
    const [duracion, setDuracion] = useState(0)
    const [totalGame, setTotalGame] = useState([])

    const history = useHistory()
    console.log('soy sport modal', sport)
    const modificar = async () => {
        setIndice(0)
        console.log('entro handle close')
        const res = await axios.delete(`https://falta-uno-1.herokuapp.com/owner/deleteField/${field.id}`)
        console.log(res.data)
        setShowModal(false)

    };

    const cancelTurn = (e) => {
        if (totalGame.includes(parseFloat(e.target.value))) {
            setTotalGame(totalGame.filter((value) => value != e.target.value))
        } else{
            setTotalGame([...totalGame, parseFloat(e.target.value)])

        }
    }

    useEffect(() => {
        let duration = convertirTime(newField.durationPerTurn)
        setDuracion(duration)
    },[newField.durationPerTurn])

    const handleCreate = (e) => {
        e.preventDefault();

        // totalGame?.map((e) => {
        //
        if (indice < 6) setIndice(indice + 1)
        if (indice == 6) {
            setIndice(0)
            if(!fieldId){
                setNewField({
                name: "",
                sport: sport,
                available: "",
                pricePerTurn: "",
                durationPerTurn: "",
                description: "",
                capacity: "",
                start: "",
                end: "", 
                complexId: ""
              
            })
            }
            
            setShowModal(false)
        }

        let deporte = sport
        let tipo= type

        // console.log("holaaaaa",currentField)
        totalGame.map((e) => {
            !fieldId ? 
            dispatch(createGame({
                date: dias[indice],
                sport: newField.sport,
                type: newField.capacity,
                status: 'free',
                start: e,
                end: e + convertirTime(newField.durationPerTurn),
                fieldId: field.id
            })) :
            dispatch(createGame({
                date: dias[indice],
                sport: deporte,
                type: tipo,
                status: 'free',
                start: e,
                end: e + convertirTime(newField.durationPerTurn),
                fieldId: fieldId
            })) 

        })
        if (indice < 6) {
            if(totalGame.length === 0){
                swal('', `No se crearon turnos para el día ${dias[indice]}`, 'warning' )
            }
            else swal('', `Los turnos del dia ${dias[indice]} fueron creados exitosamente`, 'success')
        }
        if (indice == 6) {

            swal('', "Cancha y turnos creados exitosamente!", 'success')
            history.push("/owner/select")
        }

        
    };

    const appointments = (newField) => {
        let duracion = convertirTime(newField.durationPerTurn)
        let start = convertirTime(newField.start)
        let end = convertirTime(newField.end)
        let array = [start];
        let i = 0

        if (duracion > 0) {
            if (end > start) {
                if ((end - start) > duracion) {
                    while (array[i] + duracion + duracion <= end) {
                        if (array.length === 1) {
                            let result = parseFloat(start) + parseFloat(duracion)
                            array.push(result)
                            i++
                        } else {
                            let newResult = array[i] + duracion
                            array.push(newResult)
                            i++
                        }
                    }
                    return array;
                }
            } else if (start > end) {
                let corte = 24 + parseFloat(end) //26 
                //23           1                           1 
                if ((corte - start) > duracion) {
                    while (array[i] + duracion + duracion <= corte) {
                        if (array.length === 1) {
                            let result = parseFloat(start) + parseFloat(duracion)
                            array.push(result)
                            i++
                        } else {
                            let newResult = array[i] + duracion
                            array.push(newResult)
                            i++
                        }
                    }
                    for (let i = 0; i < array.length; i++) {
                        if(array[i] >= 24){
                            array[i] = array[i] - 24
                            console.log(array, 'array en el for')
                        }
                        // switch (array[i]) {
                        //     case 24:
                        //         array[i] = 0
                        //         break;
                        //     case 24.5:
                        //         array[i] = 0.5
                        //         break;
                        //     case 25:
                        //         array[i] = 1
                        //         break;
                        //     case 25.5:
                        //         array[i] = 1.5
                            //     break;
                            // case 26:
                            //     array[i] = 2
                            //     break;
                            // case 26.5:
                            //     array[i] = 2.5
                            //     break;
                            // case 27:
                            //     array[i] = 3
                            //     break;
                            // case 27.5:
                            //     array[i] = 3.5
                            //     break;
                            // case 28:
                            //     array[i] = 4
                            //     break;
                            // default:
                            //     break;
                        // }
                    }

                    return array;
                }
            } else {
                return null;
            }
        }
    }

    const cambioHora = (num) => {
        if(num >= 24){
            num = num - 24
            let numero = num.toString()
            if(!numero.includes('.')){
              return numero + ':00'
            } else {
              let resultado = numero.replace('.5', ':30')
              return resultado
            }
        }
        let numero = num.toString()
        if(!numero.includes('.')){
            return numero + ':00'
        } else {
            let resultado = numero.replace('.5', ':30')
            return resultado
        }
    }

    var turn = appointments(newField)
    
    useEffect(() => {
        setTotalGame(appointments(newField))
    },[newField])

    useEffect(() => {
        setTotalGame(appointments(newField))
    },[indice])
    
    return (
        <div className={s.contenedor}>
            <Modal show={showModal} size="lg" aria-labelledby="example-modal-sizes-title-lg">
                <Modal.Header className={s.contenedorTitle}>
                    <Modal.Title>
                            <h2 className={s.titulo}>Esquema de turnos</h2>
                            <p className={s.subTitulo}>Selecciona en rojo los turnos que NO se deben crear</p>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className={s.contenedorBody}>
                    <div >
                <div className={s.dia}>{dias[indice]}</div>
                <div className={s.turnos}>
                    {/* <button>holamami</button> */console.log('turnnn', turn)}
                    {turn?.map((e) => totalGame?.includes(e) ? <button onClick={cancelTurn} className={s.botonVerde} key={e} value={e}>{cambioHora(e) + 'hs'}-{cambioHora(e + duracion) + 'hs'}</button> : <button onClick={cancelTurn} className={s.botonRojo} key={e} value={e}>{cambioHora(e) + 'hs'}-{cambioHora(e + duracion) + 'hs'}</button>)}
                </div>
                </div>
                </Modal.Body>
                <Modal.Footer className={s.footer} style={{'backgroundColor':'rgb(133, 133, 133);'}}>
                    {/* <button onClick={handleClose} className={s.modificar}>
                        Modificar Cancha
                    </button> */}
                    <button onClick={modificar} className={s.modificar}>
                        Modificar Cancha
                    </button>
                    <button variant="primary" onClick={handleCreate} className={s.crear} >
                        {indice < 6 ? 'Aceptar' : 'Finalizar'}
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}