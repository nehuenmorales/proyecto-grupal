import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import StarRating from "../../Rating/starRating";


export default function ModalRating({ showModal, setShowModal, complex }) {
    
    return (
            <Modal show={showModal} size="lg" aria-labelledby="example-modal-sizes-title-lg">
                <Modal.Header>
                    <Modal.Title>
                        <h2 >Califica tu experiencia</h2>
                        <p>Queremos saber como la pasaste en turno</p>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <StarRating complex={complex} onClick={setShowModal(false)}/>
                </Modal.Body>
                
            </Modal>
    );
}