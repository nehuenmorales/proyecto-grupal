import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';


export default function ModalsFieldsGames({ showModal, setShowModal, complex }) {
    
    return (
            <Modal show={showModal} size="lg" aria-labelledby="example-modal-sizes-title-lg">
                <Modal.Header>
                    <Modal.Title>
                        <h2 className={s.titulo}>Califica tu experiencia</h2>
                        <p className={s.subTitulo}>Queremos saber como la pasaste en turno</p>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <StarRating complex={complex}/>
                </Modal.Body>
                
            </Modal>
    );
}