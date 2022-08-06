import React, { useState } from "react";
import { Modal, Button} from 'react-bootstrap';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "../../../pages/DetailComplex/DetailComplex.css";


export default function ModalGames({ showModal, setShowModal, detail }) {

    const handleClose = () => setShowModal(false);
    const history = useHistory()


    function HandleSelect(e){
        e.preventDefault(e)
        history.push(`/games/detail/${e.target.value}`)
    }

    return (

        <div>
            <Modal show={showModal} onHide={handleClose} size="lg" aria-labelledby="example-modal-sizes-title-lg">
                <Modal.Header>
                    <Modal.Title>
                        <h2>Turnos Disponibles</h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {detail?.map((e) => {
                        return (
                            <Button onClick={(e)=>HandleSelect(e)} className='text-black w-100 m-1 buttoncito' variant='light' size='lg' key={e.id} value={e.id}>{e.date}  {e.start}h-{e.end}h</Button>
                        )
                    })}
                </Modal.Body>
            </Modal>
        </div >
    );
}