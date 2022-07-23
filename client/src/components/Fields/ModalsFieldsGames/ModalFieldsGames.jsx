import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from "react-redux";
import { createGame } from "../../../redux/Games/gameActions";
import { useHistory } from "react-router-dom";
import s from './modals.module.css'

export default function ModalsFieldsGames({ showModal, setShowModal, setNewField, newField, sport, convertirTime }) {
    let dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
    const dispatch = useDispatch();
    const field = useSelector((state) => state.fieldsReducer.field)
    const handleClose = () => setShowModal(false);
    const [indice, setIndice] = useState(0)
    const [duracion, setDuracion] = useState(0)
    const [totalGame, setTotalGame] = useState([])

    console.log(totalGame, 'total game')

    const history = useHistory()

    const cancelTurn = (e) => {
        if (totalGame.includes(parseFloat(e.target.value))) {
            //turn = turn.filter((value) => value != e.target.value)
            setTotalGame(totalGame.filter((value) => value != e.target.value))
        } else{
            //turn.push(parseInt(e.target.value))
            setTotalGame([...totalGame, parseFloat(e.target.value)])

        }
        console.log('soy turn', turn)
    }
    console.log('soy totalGame', totalGame)

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
              
            })
            setShowModal(false)
        }


        // console.log("holaaaaa",currentField)
        totalGame.map((e) => {
            return dispatch(createGame({
                date: dias[indice],
                sport: newField.sport,
                type: newField.capacity,
                status: 'free',
                start: e,
                end: e + convertirTime(newField.durationPerTurn),
                fieldId: field.id
            }))
        })
        if (indice < 6) {
            if(totalGame.length === 0){
                alert(`No se agregaron turnos para el día ${dias[indice]}`)
            }
            else alert(`Turnos del dia ${dias[indice]} creados exitosamente`)
        }
        if (indice == 6) {
            alert("Cancha y turnos creados exitosamente!")
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
                        switch (array[i]) {
                            case 24:
                                array[i] = 0
                                break;
                            case 24.5:
                                array[i] = 0.5
                                break;
                            case 25:
                                array[i] = 1
                                break;
                            case 25.5:
                                array[i] = 1.5
                                break;
                            case 26:
                                array[i] = 2
                                break;
                            case 26.5:
                                array[i] = 2.5
                                break;
                            case 27:
                                array[i] = 3
                                break;
                            case 27.5:
                                array[i] = 3.5
                                break;
                            case 28:
                                array[i] = 4
                                break;
                            default:
                                break;
                        }
                    }

                    return array;
                }
            } else {
                return null;
            }
        }
    }
    var turn = appointments(newField)
    //let turnosDay = appointments(newField)
    
    useEffect(() => {
        setTotalGame(appointments(newField))
    },[newField])

    useEffect(() => {
        setTotalGame(appointments(newField))
    },[indice])
    
    return (
        <>
            <Modal show={showModal} onHide={handleClose} size="lg" aria-labelledby="example-modal-sizes-title-lg">
                <Modal.Header>
                    <Modal.Title>
                        <div>
                            <h2>Esquema de turnos</h2>
                            <p>Selecciona los turnos que no se deben mostrar disponibles por cada día de la semana.</p>
                        </div>
                        <div>{dias[indice]}</div>

                    </Modal.Title>
                </Modal.Header>
                <Modal.Body><div>
                    {/* <button>holamami</button> */console.log('turnnn', turn)}
                    {turn?.map((e) => <Button onClick={cancelTurn} key={e} value={e}>{e + 'hs'}-{e + duracion + 'hs'}</Button>)}
                </div></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Modificar Cancha
                    </Button>
                    <Button variant="primary" onClick={handleCreate}>
                        {indice < 6 ? 'Aceptar' : 'Finalizar'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}