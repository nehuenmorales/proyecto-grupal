import React, {useEffect, useState} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from "react-redux";
import { createGame } from "../../../redux/Games/gameActions";
import { createField } from "../../../redux/OwnerFields/fieldsActions";


export default function ModalsFieldsGames({ showModal, setShowModal, setNewField, newField, sport }) {
    const [date, setDate] = useState()
    const dispatch = useDispatch();
    const handleClose = () => setShowModal(false);
    let turn = [];


    const handleCreate = (e) => {
        e.preventDefault();
        console.log('soy modal con newfield', newField)
        dispatch(createField(newField));
        turn?.map((e) => {
            dispatch(createGame({
                date: date, 
                sport: newField.sport,
                type: newField.capacity,
                status: 'free',
                start: e,
                end: e + newField.durationPerTurn,
            }))
        })
        
        setNewField({
            name: "",
            sport: sport,
            available: "",
            pricePerTurn: "",
            durationPerTurn: "",
            description: "",
            capacity: "",
            start: "",
            end: ""
        });
        alert("creaste la cancha")
    };

    const appointments = (newField) => {
        let array = [newField.start];
        let i = 0
        if(newField.durationPerTurn > 0){
        if (newField.end > newField.start) {
            if((newField.end - newField.start) > newField.durationPerTurn){ 
                while (array[i] + newField.durationPerTurn + newField.durationPerTurn <= newField.end ) {
                if (array.length === 1) {
                    let result = parseFloat(newField.start) + parseFloat(newField.durationPerTurn)
                    array.push(result)
                    i++
                } else {
                    let newResult = array[i] + newField.durationPerTurn
                    array.push(newResult)
                    i++
                }
                console.log(array[i])
            }
            turn= array;
            console.log('soy turn', turn)
            return array;
        }
        } else if (newField.start > newField.end) {
            let corte = 24 + parseFloat(newField.end) //26 
            //23           1                           1 
            if( (corte - newField.start) > newField.durationPerTurn ) {
               while (array[i] + newField.durationPerTurn + newField.durationPerTurn <= corte ) {
                if (array.length === 1) {
                    let result = parseFloat(newField.start) + parseFloat(newField.durationPerTurn)
                    array.push(result)
                    i++
                } else {
                    let newResult = array[i] + newField.durationPerTurn
                    array.push(newResult)
                    i++
                }
                console.log(array[i])
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
            turn = array;
            console.log('soy turn', turn)
            return array;
        }  
     }  else {
         return null;
     }
    }                
}
const handleDate = (e) => {
    e.preventDefault()
    setDate(e.target.value)
}

    return (
        <>
            <Modal show={showModal} onHide={handleClose} size="lg" aria-labelledby="example-modal-sizes-title-lg">
                <Modal.Header closeButton>
                    <Modal.Title>
                        <div>
                            <h2>Esquema de turnos</h2>
                            <p>Selecciona los turnos que no se deben mostrar disponibles por cada día de la semana.</p>
                        </div>
                        <div>
                            <select onClick={(e) => handleDate(e)}>
                                <option value="Lunes">Lunes</option>
                                <option value="Martes">Martes</option>
                                <option value="Miércoles">Miércoles</option>
                                <option value="Jueves">Jueves</option>
                                <option value="Viernes">Viernes</option>
                                <option value="Sábado">Sábado</option>
                                <option value="Domingo">Domingo</option>
                            </select>
                        </div>

                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>{appointments(newField)}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Atrás
                    </Button>
                    <Button variant="primary" onClick={handleCreate}>
                        Crear
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}