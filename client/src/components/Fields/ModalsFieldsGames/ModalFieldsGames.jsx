import React from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from "react-redux";
import { createField } from "../../../redux/OwnerFields/fieldsActions";


export default function ModalsFieldsGames({showModal, setShowModal, setNewField, newField, sport}){
    const dispatch = useDispatch();
    const handleClose = () => setShowModal(false);
    const handleCreate = (e) => {
        e.preventDefault();
        console.log('soy modal con newfield',newField)
        dispatch(createField(newField)); 
        setNewField({
            name: "",
            sport: sport,
            available:"",
            pricePerTurn:"",
            durationPerTurn:"",
            description: "",
            capacity: "",
            start: "",
            end:""
        });
        alert("creaste la cancha")
        };
    
    const appointments = (newField) => {
        let array = [newField.start];
        let i = 0
        while (array[i] + newField.durationPerTurn < newField.end) {
            if(array.length === 1) {
                let result = parseInt(newField.start) + parseInt(newField.durationPerTurn)
                array.push(result)
                i++
            } else {
                let newResult = array[i] + newField.durationPerTurn
                array.push(newResult)
                i++
            }
            console.log(array[i])
        }
        return array;
    }

    return (
      <>
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
                <div>
                    <h2>Esquema de turnos</h2>
                    <p>Selecciona los turnos que no se deben mostrar disponibles por cada día de la semana.</p>
                </div>
                <div>
                    <select>
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