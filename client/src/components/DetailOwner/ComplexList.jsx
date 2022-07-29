import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from 'react-router-dom'
import Button from "react-bootstrap/esm/Button";

export default function ComplexList() {
    const [complex, setComplex] = useState([])
    let owner = useSelector((state) => state.getOwnerReducer.owner)

    useEffect(() => {
        axios.get(`https://falta-uno-1.herokuapp.com/owner/getComplexByOwner/${owner.id}`)
            .then(res => setComplex(res.data))
    }, [])

    return (
        <div>
            <div style={{ 'padding': '10px' }}>
                <Link to='/'>
                    <Button>Volver</Button>
                </Link>
            </div>

            {complex?.map((e) => {
                return (
                    <div key={e.id} >
                        <img src={e.image} alt="" />
                        <p>{e.name}</p>
                        <p>{e.address}</p>
                    </div>
                )
            })}
        </div>
    )
}