import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from 'react-router-dom'
import Button from "react-bootstrap/esm/Button";
import "./ComplexList.css"
import VerticalNavbar from "../../VerticalNavbar/VerticalNavbar";

export default function ComplexList() {
    const [complex, setComplex] = useState([])
    let owner = useSelector((state) => state.getOwnerReducer.owner)

    useEffect(() => {
        axios.get(`https://falta-uno-1.herokuapp.com/owner/getComplexByOwner/${owner.id}`)
            .then(res => setComplex(res.data))
    }, [])

    return (
        <div className="complexList">
            <div className="nav-bar">
                <Link to='/'>
                    <Button className="volverbtn">Volver</Button>
                </Link>
                <VerticalNavbar />
            </div>
            <div className="titulo-complejos">
                <h5>Tus complejos</h5>
            </div>

            <div className="container-complexcard">
                {complex?.map((e) => {
                    return (
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
                                <div>
                                    {e.sports.map(sport => {
                                        if (sport === 'futbol') {
                                            return (
                                                <img src="https://cdn-icons.flaticon.com/png/512/4892/premium/4892438.png?token=exp=1659223244~hmac=6844f5a1ed7c449c8687e491ea380565" alt="" style={{ height: '25px' }} className="sport-icon" />
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
                    )
                })}
            </div>
        </div>
    )
}