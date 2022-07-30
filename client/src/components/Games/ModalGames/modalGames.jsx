import React, { useEffect, useState } from "react";
import { Modal, Button, Card, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateGame } from "../../../redux/Games/gamesAction";
import swal from 'sweetalert';
import { useAuth0 } from '@auth0/auth0-react';

export default function ModalGames({showModal, setShowModal, sport, id, price,supplies}) {
    
    const dispatch = useDispatch();
    const handleClose = () => setShowModal(false);
    const history = useHistory()
    const sports = ["single","dobles"]
    const [ isPublic, setIsPublic ] = useState()
    const [body, setBody]=useState({id:0,privacy:"",requirements:"",link:"",type:"",status:""})   
    const [ leitoTheBest, setLeitoBest ] = useState(0);
    const [ local, setLocal ] = useState([]);
    const[errorsValue, setErrorsValue] = useState({})
    

    useEffect(()=>{
        setLeitoBest(price)
        setLocal(supplies.map(sup=>Object.assign({},sup)))
        
    },[dispatch,supplies])
    
    const suma = (supplie) => {

        let porfa= local.filter(e=>e.id===supplie.id)
        if(supplie.stock>porfa[0].stock)return;
        if((supplie.stock-1) < 0) return;
        setLeitoBest(leitoTheBest + supplie.price)
        supplie.stock--;
    }
    
    const resta = (supplie) => {
        if( supplie.stock  < 0 ) return;
        let porfa= local.filter(e=>e.id===supplie.id)
        if(supplie.stock+1>porfa[0].stock)return;
        if(( leitoTheBest - supplie.price) < price ) return;
        setLeitoBest(leitoTheBest - supplie.price)
        supplie.stock++
    }

    const HandleUpdate=(e)=>{
        setBody({...body,[e.target.name]:e.target.value})
    }
    const HandlePrivacy=(e)=>{
        if(e.target.value==="public"){
            setIsPublic(true) 
        }else{
            setIsPublic(false)
        }
        setBody({...body,[e.target.name]:e.target.value,status:"pending",id:id})
    }

    function validateValue({privacy,type,status}){
        let errors = {}
        if(!privacy){
            errors.privacy = "Seleccione la privacidad"
        }
        if(sport==="tenis"||sport==="padel"){
            if(!type || type === "Elige"){
                errors.type = "Seleccione su tipo de juego"
            }
        }
        return errors;
      }

    const HandleSubmit=(e)=>{
        e.preventDefault()
        setErrorsValue(validateValue(body))
        const error = validateValue(body)
        if(Object.values(error).length === 0){
            dispatch(updateGame(id,body))
          }
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
                              <select onChange={e=>HandleUpdate(e)} className="form-select" name="type">
                                <option hidden>Elige</option>
                                {sports?.map((e) => {
                                    return (
                                        <option key={e.id} value={e}>{e}</option>
                                    )
                                })}
                            </select>
                            </div>
                            :null
                        }
                        <p>{errorsValue.type}</p>  
                        <div className="form-group d-flex flex-column">
                            <label>¿Como queres que sea tu partido?</label>
                            <div>
                               <input name="privacy" className="form-check-input" onChange={(e)=>{HandlePrivacy(e)}} id="private" value="private" type="radio"/>             
                                <label htmlFor="private">Privado</label>
                                <input name="privacy" className="form-check-input" onChange={(e)=> {HandlePrivacy(e)}} id="public" value="public" type="radio" />             
                                <label htmlFor="public">Publico</label> 
                                <p>{errorsValue.privacy}</p> 
                            </div>
                            
                        </div>
                        

                    {
                        isPublic?
                        <textarea name="requirements" onChange={e=>HandleUpdate(e)} className="form-control h-100" maxLength="1000" placeholder="Escribe los requisitos para que otros jugadores puedan unirse a tu juego!"></textarea>
                        :null
                    }
                    <div className="form-group d-flex flex-column" >
                    <label>Link de la transmision</label>
                    <input name="link" onChange={e=>HandleUpdate(e)} className="form-control" type="text" placeholder="Link"></input>
                    </div>
                    <label>Elementos para alquilar</label>
                    <Container className="d-flex m-3 justify-content-around flex-wrap align-items-center">
                    {
                            supplies?.map( supplie => { 
                            return(
                                    <Card key={supplie.id} style={{ width: '13rem' }}>
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
                    <button onClick={(e)=>HandleSubmit(e)} className="btn btn-primary">
                        Ir a pagar
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}