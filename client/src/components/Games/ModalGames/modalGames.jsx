import { Radio, RadioGroup, Stack, Divider} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Modal, Button, Card, Container, Form } from 'react-bootstrap';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateGame } from "../../../redux/NuevoGames/gamesAction";
import { postPayments, resetUrlPayment } from "../../../redux/Payments/paymentsAction";


export default function ModalGames({ showModal, setShowModal, sport, id, price, supplies }) {

    const dispatch = useDispatch();
    const handleClose = () => setShowModal(false);
    const history = useHistory()
    const sports = ["single", "dobles"]
    const [isPublic, setIsPublic] = useState()
    const [body, setBody] = useState({ id: 0, privacy: "", requirements: "", link: "", type: "", status: "" })
    const [leitoTheBest, setLeitoBest] = useState(0);
    const [local, setLocal] = useState([]);
    const [errorsValue, setErrorsValue] = useState({});

    useEffect(() => {
        setLeitoBest(price)
        setLocal(supplies.map(sup => Object.assign({}, sup)))
    }, [dispatch, supplies])

    const suma = (supplie) => {

        let porfa = local.filter(e => e.id === supplie.id)
        if (supplie.stock > porfa[0].stock) return;
        if ((supplie.stock - 1) < 0) return;
        setLeitoBest(leitoTheBest + supplie.price)
        supplie.stock--;
    }

    const resta = (supplie) => {
        if (supplie.stock < 0) return;
        let porfa = local.filter(e => e.id === supplie.id)
        if (supplie.stock + 1 > porfa[0].stock) return;
        if ((leitoTheBest - supplie.price) < price) return;
        setLeitoBest(leitoTheBest - supplie.price)
        supplie.stock++
    }

    const HandleUpdate = (e) => {
        setBody({ ...body, [e.target.name]: e.target.value })
    }
    const HandlePrivacy = (e) => {
        if (e.target.value === "public") {
            setIsPublic(true)
        } else {
            setIsPublic(false)
        }
        setBody({ ...body, [e.target.name]: e.target.value, status: "pending", id: id })
    }

    function validateValue({ privacy, type }) {
        let errors = {}
        if (!privacy) {
            errors.privacy = "Seleccione la privacidad"
        }
        if (sport === "tenis" || sport === "padel") {
            if (!type || type === "Elige") {
                errors.type = "Seleccione su tipo de juego"
            }
        }
        return errors;
    }

    // const HandleSubmit = (e) => {
    //     e.preventDefault()
    //     setErrorsValue(validateValue(body))
    //     const error = validateValue(body)
    //     if (Object.values(error).length === 0) {
    //         dispatch(updateGame(id, body))
    //     }
    //     setUserData({
    //         ...userData,
    //         total: leitoTheBest,

    //     })
    //     setPagar(true)
    // }

    // Modal para mercado pago
    const [pagar, setPagar] = useState(false);
    const [userData, setUserData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        postal: '',
        // barrio: '',
        // street_number: '',
        tipo: 'dni',
        dni: '',
        total: 0
    });

    const handleCloseData = () => setPagar(false);
    const handleShow = () => setPagar(true);

    const handleChangeUserData = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,

        })
    }

    const handleSubmitMP = (e) => {
        e.preventDefault();
        setErrorsValue(validateValue(body))
        const error = validateValue(body)
        if (Object.values(error).length === 0) {
            dispatch(updateGame(id, body))
        }
        setUserData({
            ...userData,
            total: leitoTheBest,

        })
        // validateText(userData.nombre)
        dispatch(postPayments(id, userData));
    }

    return (

        <div>
            <Modal show={showModal} onHide={handleCloseData} size="lg" aria-labelledby="example-modal-sizes-title-lg">
                <Modal.Header>
                    <Modal.Title>
                        <h1 style={{fontSize:"25px"}}>Personaliza tu reserva</h1>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        {
                            sport === "tenis" || sport === "padel" ?
                                <div className="form-group">
                                    <label>Elegi tu forma de juego</label>
                                    <select onChange={e => HandleUpdate(e)} className="form-select" name="type">
                                        <option hidden>Elige</option>
                                        {sports?.map((e) => {
                                            return (
                                                <option key={e.id} value={e}>{e}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                : null
                        }
                        <p>{errorsValue.type}</p>
                        <div className="form-group d-flex flex-column">
                            <p style={{fontSize:"20px",marginBottom:"10px"}}>¿Como queres que sea tu partido?</p>
                            <div style={{marginBottom:"10px"}}>
                                <RadioGroup>
                                <Stack spacing={5} direction='row'>
                                    <Radio colorScheme='green' size='lg' name="privacy" className="form-check-input" onChange={(e) => { HandlePrivacy(e) }} id="private" value="private" type="radio"> 
                                    Privado
                                    </Radio>
                                    <Radio colorScheme='green' size='lg' name="privacy" className="form-check-input" onChange={(e) => { HandlePrivacy(e) }} id="public" value="public" type="radio">
                                    Publico
                                    </Radio>
                                </Stack>
                                    <p>{errorsValue.privacy}</p>
                                </RadioGroup>
                            </div>

                        </div>

                        {
                            isPublic ?
                            <textarea style={{marginBotton:"10px"}} name="requirements" onChange={e => HandleUpdate(e)} className="form-control h-100" maxLength="1000" placeholder="Escribe los requisitos para que otros jugadores puedan unirse a tu juego!"></textarea>
                            : null
                        }

                        <div className="form-group d-flex flex-column" >
                            <label style={{fontSize:"20px",marginBottom:"10px",marginTop:"10px"}} >Link de la transmision</label>
                            <input name="link" onChange={e => HandleUpdate(e)} className="form-control" type="text" placeholder="Link"></input>
                        </div>
                        
                        {supplies.length>0?
                        <div>
                        <label style={{fontSize:"20px",marginBottom:"10px", marginTop:"10px"}}>Elementos para alquilar</label>
                        <Container className="d-flex m-3 justify-content-around flex-wrap align-items-center">
                            {
                                supplies?.map(supplie => {
                                    return (
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
                                                    onClick={() => suma(supplie)} variant="primary">+</Button>

                                            </Card.Body>
                                        </Card>
                                    )
                                })
                            }
                        </Container>
                        </div>
                        :null
                        }

                        <p style={{fontSize:"20px", marginTop:"20px"}}>total  <b>${leitoTheBest}</b></p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secundary" onClick={handleClose}>
                        Volver
                    </button>
                    <Button onClick={() => setPagar(true)} style={{backgroundColor:'rgba(0, 184, 62, 1)',border:"none"}}>
                        Siguiente
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={pagar} onHide={handleCloseData}>
                <Modal.Header closeButton>
                    <Modal.Title>Completa tus datos</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={(e) => handleSubmitMP(e)}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                name="nombre"
                                onChange={(e) => handleChangeUserData(e)}
                                type="text"
                                placeholder="Juan"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Apellido</Form.Label>
                            <Form.Control
                                name="apellido"
                                onChange={(e) => handleChangeUserData(e)}
                                type="text"
                                placeholder="Perez"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                name="email"
                                onChange={(e) => handleChangeUserData(e)}
                                type="email"
                                placeholder="name@example.com"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Teléfono</Form.Label>
                            <Form.Control
                                name="telefono"
                                onChange={(e) => handleChangeUserData(e)}
                                type="tel"
                                placeholder="Tu número de teléfono"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Código Postal</Form.Label>
                            <Form.Control
                                name="postal"
                                onChange={(e) => handleChangeUserData(e)}
                                type="number"
                                placeholder="Tu código Postal"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>D.N.I.</Form.Label>
                            <Form.Control
                                name="dni"
                                onChange={(e) => handleChangeUserData(e)}
                                type="text"
                                placeholder="D.N.I."
                                autoFocus
                            />
                        </Form.Group>
                        <div style={{display:"flex", justifyContent:"flex-end"}}>
                        <button className="btn btn-secundary" onClick={handleCloseData}>
                        Volver
                        </button>
                        <Button type="submit" style={{backgroundColor:'rgba(0, 184, 62, 1)',border:"none"}}>
                            Ir a pagar
                        </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </div >
    );
}