import React  from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSupplieDetail } from "../../../redux/OwnerSupplies/SuppliesDetailOwner/SuppliesDetailAction"
import { modifySupplie } from "../../../redux/OwnerSupplies/ModifySupplie/modifySupplieAction";
import swal from 'sweetalert';
import { useHistory } from "react-router-dom";

export default function SupplieDetail({ id }) {
    const dispatch = useDispatch();
    let supplie = useSelector((state) => state.supplieDetailReducer.supplieDetail)
    const [change, setChange] = useState({
        price: '',
        stock: '',
    })
    const [errors, setErrors] = useState({
        price: "",
        stock: "",
    });

    const history = useHistory()

    useEffect(() => {
        dispatch(getSupplieDetail(id));
    },[])

    useEffect(() => {
        setChange({ price: supplie?.price, stock: supplie?.stock })
    }, [supplie])

    const validator = (change) => {// funcion que valida que todos los inputs tengan un valor "aceptable"
        let validations = {};
        const beNumber = /(^\d{1,10}$)/;
         if (!change.price) {
            validations.price = "Ingrese el precio del producto"
        } else if (!beNumber.test(change.price)) {
            validations.price = "Ingrese solo numeros"
        } else if (!change.stock) {
            validations.stock = "Ingrese el stock del producto"
        } else if (!beNumber.test(change.stock)) {
            validations.stock = "Ingrese solo números"
        }
        return validations;
    };

    const onClick = (ev) => {
        ev.preventDefault()
        setChange({ ...change, [ev.target.name]: parseInt(ev.target.value) })
        let errores = validator({ ...change, [ev.target.name]: parseInt(ev.target.value) });
        setErrors(errores);
    }

    const handleSubmit = (ev) => {
        ev.preventDefault()
        dispatch(modifySupplie(change, id))
        swal('', "Elemento modificado exitosamente!", 'success')
        history.push("/")
    }

    return (
            <div className="contenedorDetail">
            <div className='izquierda'>
                <Link to='/suppliesOwner' style={{ 'padding': '10px', 'width': '25%', 'margin': '20px 10px 10px 10px' }}>
                    <Button style={{ 'marginTop': '15px' }}>Volver</Button>
                </Link>
                <div className="tituloName">
                    <h2 className="fw-normal text-white fst-italic m-9" style={{ fontSize: '3em', marginLeft: '35%' }}>{supplie.name}</h2>
                    <p className="fw-normal text-white fst-italic m-9" style={{ fontSize: '1.5em', marginLeft: '35%' }}>{supplie.complexId}</p>
                </div>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className='contenedorLapiz' style={{ marginBottom: '10px', paddingBottom: '0', height: '40px'}}>
                        <p className="subTitulos">Precio</p>
                        <img src='https://cdn-icons-png.flaticon.com/512/1250/1250615.png' className='lapiz'></img>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', marginTop: '0', paddingTop: '5px' }}>
                    <img src='https://cdn-icons-png.flaticon.com/512/74/74742.png' style={{ marginLeft: '80px', height: '22px', filter: 'invert(100%)', marginTop: '6px' }}></img>
                    <input type='text' className="infoForm" style={{ marginLeft: '0', fontSize: '22px', paddingTop: '0', marginTop: '0'}} name='price' onChange={ev => onClick(ev)} value={ change.price ? parseInt(change.price) : 0} />
                    </div>
                    {errors.price ? <div className="errores" style={{ marginLeft: '80px' }}>{errors.price}</div> : null}
                    <div className='contenedorLapiz' style={{ marginBottom: '10px', paddingBottom: '0' , height: '40px'}}>
                        <p className="subTitulos">Stock disponible</p>
                        <img src='https://cdn-icons-png.flaticon.com/512/1250/1250615.png' className='lapiz'></img>
                    </div>
                    <input type='text' className="infoForm" name='stock' style={{ fontSize: '22px', paddingTop: '0', marginTop: '0'}} onChange={ev => onClick(ev)} value={change.stock ? parseInt(change.stock) : 0} />
                    {errors.stock ? <div className="errores" style={{ marginLeft: '80px' }}>{errors.stock}</div> : null}
                    <div className='contenedorBoton' style={{marginTop: '50px'}}>
                        {
                             !errors.stock &&
                             !errors.price ?
                                //parseInt(change.price) !== parseInt(supplie.price) || parseInt(change.stock) !== parseInt(supplie.stock) ?
                                <button type="submit" className='botonActivo'
                                >Guardar cambios</button> : <button type="submit" className='btnGris' disabled >Guardar cambios</button>
                        }

                    </div>
                </form>
            </div>
            <div style={{ backgroundImage: `url(${supplie.image})` }} className='derecha'>
                <div className='div-rating' style={{ backgroundColor: `rgba(12, 19, 31, 1);`, padding: '7px 15px 3px', height: '50px', width: '150px' }}>
                    <p style={{ color: 'white', fontSize: '23px' }}>{supplie.sport}</p>
                </div>
            </div>
        </div>
    )
}