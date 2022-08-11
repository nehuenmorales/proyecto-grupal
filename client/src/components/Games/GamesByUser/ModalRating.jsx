import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import StarRating from "../../Rating/starRating";
import { Heading } from '@chakra-ui/react'

export default function ModalRating({ showModal, setShowModal, complex }) {
    
    return (
            <Modal show={showModal} size="md" aria-labelledby="example-modal-sizes-title-lg">
                <Modal.Header>
                    <Modal.Title>
                        <Heading style={{display:"flex",alignItems:"center", marginLeft:"45px"}}>Califica tu experiencia</Heading>
                        <p style={{fontSize:"18px",marginLeft:"45px"}}>Queremos saber como la pasaste en tu turno</p>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{marginLeft:"30px"}} >
                    <StarRating complex={complex} onClick={setShowModal(false)}/>
                </Modal.Body>
                
            </Modal>
    );
}