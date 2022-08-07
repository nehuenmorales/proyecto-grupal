import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from 'react-router-dom'
import Button from "react-bootstrap/esm/Button";
import {Flex} from "@chakra-ui/react"
import VerticalNavBarCan from "../../VerticalNavbar/VerticalNavBarCan";
//import "./FieldList.css"

export default function SuppliesList() {
    const [supplies, setSupplies] = useState([])
    let owner = useSelector((state) => state.getOwnerReducer.owner)
    useEffect(() => {
        axios.get(`/owner/getSuppliesByOwner/${owner.id}`)
            .then(res => setSupplies(res.data))
    }, [])
    return (
        <Flex>
            <VerticalNavBarCan/>
        <div className="fieldlist-container">
            <div style={{ 'padding': '10px' , 'display': 'flex','flexDirection':'row', 'justifyContent': 'space-around', 'alignItems':'center' }}>
                <Link to='/' style={{ 'padding': '10px' , 'width': '25%'}}>
                    <Button>Volver</Button>
                </Link>
            </div>
            <h5 className="fw-normal text-white fst-italic m-2" style={{padding: '30px 0 0px 40px'}}>Mis elementos en alquiler</h5>
            <div className='contenedor-cards'>
            {supplies?.map((el) => {
                return (
                el.supplies?.map((e) => {
                    return (
                        <Link to={`/supplieOwner/supplieDetail/${e.id}`} style={{textDecoration: "none"}}>
                        <div key={e.id} style={{ backgroundImage: `url(${e.image})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', maxHeight: '300px', width: '270px' }} className="complexcard">

                        <div className="content-card">

                            <div className="name-address">
                                <p className="complex-name"><i>{e.name.charAt(0).toUpperCase() + e.name.slice(1)}</i></p>
                                <p className="complex-address">{e.complexId}</p>
                            </div>
                        </div>
                        <div className="etiqueta">
                            <div className="div-rating">
                            <img src="https://cdn-icons.flaticon.com/png/512/1549/premium/1549753.png?token=exp=1659277713~hmac=3dd27828904577e2595df81a1d185beb" alt="" className="rating-img" style={{height: "15px", marginTop: "3px"}}/>
                                <p className="complex-rating"> {e.price}</p>
                            </div>
                            <div>
                                { e.sport === 'futbol' ?
                                        <img src="https://cdn-icons.flaticon.com/png/512/4892/premium/4892438.png?token=exp=1659223244~hmac=6844f5a1ed7c449c8687e491ea380565" alt="" style={{ height: '25px' }} className="sport-icon" />
                                        : e.sport === 'tenis' ?
                                        <img src="https://api.iconify.design/twemoji:tennis.svg?color=%23000000" alt="" style={{ height: '25px' }} className="sport-icon" />
                                : e.sport === 'padel'?
                                        <img src="https://cdn-icons-png.flaticon.com/512/6769/6769795.png" alt="" style={{ height: '30px' }} className="sport-icon" />
                                :       <img src="https://api.iconify.design/noto:basketball.svg?color=%23000000" alt="" style={{ height: '25px' }} className="sport-icon" />
                                    }
                            </div>

                        </div>
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