import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import "./FieldList.css"
import {Flex} from "@chakra-ui/react"
import VerticalNavBarCan from "../../VerticalNavbar/VerticalNavBarCan";

export default function FieldList() {
    const [field, setField] = useState([])
    let owner = useSelector((state) => state.getOwnerReducer.owner)
    console.log(owner, 'ownerrrr')
    useEffect(() => {
        axios.get(`https://falta-uno-1.herokuapp.com/owner/getFieldByOwner/${owner.id}`)
        .then(res => setField(res.data))
    }, [])

    const cambioHora = (num) => {
        let numero = num.toString()
        if (!numero.includes('.')) {
            return numero + ':00'
        } else {
            let resultado = numero.replace('.5', ':30')
            return resultado
        }
    }
  

    return (
        <Flex>
            <VerticalNavBarCan />
        <div className="fieldlist-container">
            <div style={{ 'padding': '10px', 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'space-around', 'alignItems': 'center' }}>
                <Link to='/' style={{ 'padding': '10px', 'width': '25%' }}>
                    <Button>Volver</Button>
                </Link>
            </div>
            <h5 className="fw-normal text-white fst-italic m-2" style={{ padding: '30px 0 0px 40px' }}>Mis canchas</h5>
            <div className='contenedor-cards'>
                {field?.map((e) => {
                    return (
                        e.fields?.map((el) => {
                            console.log('el >>>>>', el)
                            return (
                                <Link to={`/fieldOwner/fieldDetail/${el.id}`} style={{textDecoration: "none"}}>
                                    <div key={el.id} className='card-sport'>
                                        {el.sport == 'futbol' ?
                                            <div className='futbol'>
                                                <div className="name"><p>{el.name}</p></div>
                                                <div className="deporteCard">
                                                    <p>Apertura:</p>
                                                    <p> {cambioHora(el.start)}hs</p>
                                                    <p>-Cierre:</p>
                                                    <p> {cambioHora(el.end)}hs</p>
                                                </div>
                                            </div>
                                            : el.sport == 'basquet' ?
                                                <div className='basquet'>
                                                    <div className="name"><p>{el.name}</p></div>
                                                    <div className="deporteCard">
                                                        <p>Apertura:</p>
                                                        <p> {cambioHora(el.start)}hs</p>
                                                        <p>-Cierre:</p>
                                                        <p> {cambioHora(el.end)}hs</p>
                                                    </div>
                                                </div>
                                                : el.sport == 'tenis' ?
                                                    <div className='tenis'>
                                                        <div className="name"><p>{el.name}</p></div>
                                                        <div className="deporteCard">
                                                            <p>Apertura:</p>
                                                            <p> {cambioHora(el.start)}hs</p>
                                                            <p>-Cierre:</p>
                                                            <p>{cambioHora(el.end)}hs</p>
                                                        </div>
                                                    </div>
                                                    :
                                                    <div className='padel'>
                                                        <div className="name"><p>{el.name}</p></div>
                                                        <div className="deporteCard">
                                                            <p>Apertura:</p>
                                                            <p> {cambioHora(el.start)}hs</p>
                                                            <p>-Cierre:</p>
                                                            <p> {cambioHora(el.end)}hs</p>
                                                        </div>
                                                    </div>
                                        }

                                    </div>
                                </Link>

)
}))
})}
            </div>
        </div>
</Flex>
    )
}

