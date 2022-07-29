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
    const supplies = useSelector(state => state.suppliesReducer.supplies)    
    const [ leitoTheBest, setLeitoBest ] = useState(0);
    const [ local, setLocal ] = useState();
    

    useEffect(()=>{
        dispatch(getSupplies(id,sport))
        setLeitoBest(price)
    },[dispatch, id, sport])

    const suma = (supplie) => {
        setLocal(supplies)
        if((supplie.stock-1) < 0) return;
        setLeitoBest(leitoTheBest + supplie.price)
        supplie.stock--;
    }
    
    const resta = (supplie) => {
        let porfa= local.filter(e=>e.id===supplie.id)
        console.log("este",porfa)
        console.log("este otro",porfa[0].stock)
        if( supplie.stock  < 0 ) return;
        if(supplie.stock>porfa[0].stock)
        if(( leitoTheBest - supplie.price) < price ) return;
        setLeitoBest(leitoTheBest - supplie.price)
        supplie.stock++
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
            

                                    <Card style={{ width: '13rem' }}>
                                      <Card.Img variant="top" src={supplie.image} />
                                      <Card.Body>
                                        <Card.Title>{supplie.name}</Card.Title>
                                        <Card.Text>
                                          {supplie.stock},
                                          ${supplie.price}
                                        </Card.Text>

                                        <Button 
                                        onClick={() => resta(supplie)} variant="danger">-</Button>

                                        <Button 
                                        onClick={() => suma(supplie)}  variant="primary">+</Button>

                                     </Card.Body>
                                  </Card>
                                )
                            })
                        }
                        </Container>

                        <p>total $ {leitoTheBest}</p>
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