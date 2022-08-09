import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from 'react-router-dom'
import Button from "react-bootstrap/esm/Button";
import "./ComplexList.css"
import VerticalNavBarCan from "../../VerticalNavbar/VerticalNavBarCan";
import {Flex} from "@chakra-ui/react"

export default function ComplexList() {
    const [complex, setComplex] = useState([])
    let owner = useSelector((state) => state.getOwnerReducer.owner)

    console.log(complex)

    useEffect(() => {
        axios.get(`/owner/getComplexByOwner/${owner.id}`)
            .then(res => {
                setComplex(res.data)})
    }, [])

    return (
        <Flex>
            <VerticalNavBarCan/>
            <div className="fieldlist-container">
            <div style={{  marginLeft:'20px','padding': '10px', 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'flex-start', 'alignItems': 'center' }}>
                <Link to='/' style={{'padding': '10px', 'width': '25%' }}>
                    <Button>Volver</Button>
                </Link>
            </div>
        
            <h5 className="fw-normal text-white fst-italic m-2" style={{padding: '30px 0 0px 40px'}}>Mis Complejos</h5>

            <div className="container-complexcard">
                {complex?.map((e) => {
                    return (
                        <Link to={`owner/complexDetail/${e.id}`} style={{textDecoration: "none"}}>
                        <div key={e.id} style={{ backgroundImage: `url(${e.image})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', maxHeight: '320px', width: '300px' }} className="complexcard">

                            <div className="content-card">

                                <div className="name-address">
                                    <p className="complex-name"><i>{e.name.charAt(0).toUpperCase() + e.name.slice(1)}</i></p>
                                    <p className="complex-address">{e.address}</p>
                                </div>
                            </div>
                            <div className="etiqueta">
                                <div className="div-rating">
                                    <img src="https://api.iconify.design/material-symbols:star-rounded.svg?color=%23ffee00" alt="" className="rating-img" />
                                    <p className="complex-rating"> {e.rating}</p>
                                </div>
                                <div style={{width: '100%', display: 'flex', flexDirection:'row', justifyContent:'flex-end'}}>
                                    {e.sports?.map(sport => {
                                        if (sport === 'futbol') {
                                            return (
                                                <img src="https://cdn-icons-png.flaticon.com/512/3231/3231063.png" alt="" style={{ height: '25px',  filter: 'invert(100%)'  }} className="sport-icon" />
                                            )
                                        } else if (sport === 'tenis') {
                                            return (
                                                <img src="https://api.iconify.design/twemoji:tennis.svg?color=%23000000" alt="" style={{ height: '25px' }} className="sport-icon" />
                                            )
                                        } else if (sport === 'padel') {
                                            return (
                                                <img src="https://cdn-icons-png.flaticon.com/512/6769/6769795.png" alt="" style={{ height: '30px' }} className="sport-icon" />
                                            )
                                        } else {
                                            return (
                                                <img src="https://api.iconify.design/noto:basketball.svg?color=%23000000" alt="" style={{ height: '25px' }} className="sport-icon" />
                                            )
                                        }
                                    })}
                                </div>

                            </div>
                        </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    </Flex>
    )
}