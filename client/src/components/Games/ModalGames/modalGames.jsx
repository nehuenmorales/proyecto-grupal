import React, { useEffect, useState } from "react";
import { Modal, Button, Card, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getSupplies } from "../../../redux/OwnerSupplies/suppliesActions";
import swal from 'sweetalert';
import { useAuth0 } from '@auth0/auth0-react';

export default function ModalGames({showModal, setShowModal, sport, id, price}) {
    
    const dispatch = useDispatch();
    const handleClose = () => setShowModal(false);
    const history = useHistory()
    const sports = ["single","dobles"]
    const [ isPublic, setIsPublic ] = useState()
    const [ total, setTotal ] = useState(0)
    const supplies = useSelector(state => state.suppliesReducer.supplies)
    var cart = [];

    useEffect(()=>{
        dispatch(getSupplies(id,sport))
        setTotal(price);
    },[dispatch, id, sport])

    useEffect(() => {
        if(cart.length === 0){
            supplies?.map( supplie => {
                const obj = {
                    ...supplie,
                    quantity: 0
                }
                cart.push(obj)
            })
            console.log('ahora yo soy el cart poke yo si ando :)', cart);
        }
    },[supplies])

      function addItemToCart(id) {
        console.log('estas añadiendo un item de ', id)
        console.log(cart,"soy cartsito")
        cart.map( item => {
            if(item.id === id){
                console.log('soy yo', item)
            }
        })
        console.log('¿se añadio?, fijate ailuuuu ', cart)
      }

      const removeItemToCart = ( { id } ) => {
        console.log('estas eliminando un item de ', id)
    
      }
    
      return (
        <div>
            <Modal show={showModal} onHide={handleClose} size="lg" aria-labelledby="example-modal-sizes-title-lg">
                <Modal.Header>
                    <Modal.Title>
                            <h2>Personaliza tu reserva</h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        {
                            sport==="tenis"||sport==="padel"?
                            <div className="form-group">   
                            <label>Elegi tu forma de juego</label>
                              <select className="form-select">
                                <option hidden>Elige</option>
                                {sports?.map((e) => {
                                    return (
                                        <option key={e.id} value={e.id}>{e}</option>
                                    )
                                })}
                                
                            </select>  
                            </div>
                            :null
                        }
                        <div className="form-group d-flex flex-column">
                            <label>¿Como queres que sea tu partido?</label>
                            <div>
                               <input className="form-check-input" onChange={()=> setIsPublic(false)} id="private" name="privacity" type="radio"/>             
                                <label htmlFor="private">Privado</label>
                                <input className="form-check-input" onChange={()=> setIsPublic(true)} id="public" name="privacity" type="radio" />             
                                <label htmlFor="public">Publico</label> 
                            </div>
                            
                        </div>
                        

                    {
                        isPublic?
                        <textarea className="form-control h-100" maxLength="1000" placeholder="Escribe los requisitos para que otros jugadores puedan unirse a tu juego!"></textarea>
                        :null
                    }
                    <div className="form-group d-flex flex-column" >
                    <label>Link de la transmision</label>
                    <input className="form-control" type="text" placeholder="Link"></input>
                    </div>
                    <label>Elementos para alquilar</label>
                    <Container className="d-flex m-3 justify-content-around flex-wrap align-items-center">
                    {
                            supplies?.map( supplie => { 
                            return(
                                supplie.stock > 0 ?

                                    <Card style={{ width: '13rem' }}>
                                      <Card.Img variant="top" src={supplie.image} />
                                      <Card.Body>
                                        <Card.Title>{supplie.name}</Card.Title>
                                        <Card.Text>
                                          {supplie.stock},
                                          ${supplie.price}
                                        </Card.Text>

                                        <Button 
                                        onClick={() => removeItemToCart(supplie)} variant="danger">-</Button>
                                        <p> {supplie.stock} </p>
                                        <Button 
                                        onClick={() => addItemToCart(supplie)}  variant="primary">+</Button>

                                     </Card.Body>
                                  </Card>
                                : null
                                )
                            })
                        }
                        </Container>


                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secundary" onClick={handleClose}>
                        Volver
                    </button>
                    <button className="btn btn-primary">
                        Ir a pagar
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}