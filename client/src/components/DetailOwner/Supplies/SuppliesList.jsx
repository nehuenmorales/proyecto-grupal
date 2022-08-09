import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from 'react-router-dom'
import Button from "react-bootstrap/esm/Button";
import { Flex } from "@chakra-ui/react"
import VerticalNavBarCan from "../../VerticalNavbar/VerticalNavBarCan";
//import "./FieldList.css"

export default function SuppliesList() {
    const [supplies, setSupplies] = useState([])
    let owner = useSelector((state) => state.getOwnerReducer.owner)
    useEffect(() => {
        axios.get(`https://falta-uno-1.herokuapp.com/owner/getSuppliesByOwner/${owner.id}`)
            .then(res => setSupplies(res.data))
    }, [])
    return (
        <Flex>
            <VerticalNavBarCan />
            <div className="fieldlist-container">
                <div style={{ marginLeft: '20px', 'padding': '10px', 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'flex-start', 'alignItems': 'center' }}>
                    <Link to='/' style={{ 'padding': '10px', 'width': '25%' }}>
                        <Button>Volver</Button>
                    </Link>
                </div>
                <h5 className="fw-normal text-white fst-italic m-2" style={{ padding: '30px 0 0px 40px' }}>Mis elementos en alquiler</h5>
                <div className='contenedor-cards'>
                    {supplies?.map((el) => {
                        return (
                            el.supplies?.map((e) => {
                                return (
                                    <Link to={`/supplieOwner/supplieDetail/${e.id}`} style={{ textDecoration: "none" }}>
                                        <div key={e.id} style={{ backgroundImage: `url(${e.image})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', maxHeight: '300px', width: '270px' }} className="complexcard">

                                            <div className="content-card">

                                                <div className="name-address">
                                                    <p className="complex-name"><i>{e.name.charAt(0).toUpperCase() + e.name.slice(1)}</i></p>
                                                    <p className="complex-address" style={{ marginBottom: '10px' }}>{e.complexId}</p>
                                                </div>
                                            </div>
                                            <div className="etiqueta">
                                                <div className="div-rating" style={{display:'flex', alignItems: 'center', paddingBottom:'15px'}}>

                                                    <img src="https://cdn-icons-png.flaticon.com/512/74/74742.png" alt="" className="rating-img" style={{ height: "15px", marginTop: "3px", filter: 'invert(100%)'  }} />
                                                    <p className="complex-rating"> {e.price}</p>
                                                </div>
                                                <div>
                                                    {e.sport === 'futbol' ?
                                                        <img src="https://cdn-icons-png.flaticon.com/512/3231/3231063.png" alt="" style={{ height: '25px', filter: 'invert(100%)'  }} className="sport-icon" />
                                                        : e.sport === 'tenis' ?
                                                            <img src="https://api.iconify.design/twemoji:tennis.svg?color=%23000000" alt="" style={{ height: '25px' }} className="sport-icon" />
                                                            : e.sport === 'padel' ?
                                                                <img src="https://cdn-icons-png.flaticon.com/512/6769/6769795.png" alt="" style={{ height: '30px' }} className="sport-icon" />
                                                                : <img src="https://api.iconify.design/noto:basketball.svg?color=%23000000" alt="" style={{ height: '25px' }} className="sport-icon" />
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