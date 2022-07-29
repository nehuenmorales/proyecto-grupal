import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from 'react-router-dom'
import Button from "react-bootstrap/esm/Button";

export default function FieldList() {
    const [field, setField] = useState([])
    let owner = useSelector((state) => state.getOwnerReducer.owner)

    useEffect(() => {
        axios.get(`https://falta-uno-1.herokuapp.com/owner/getFieldByOwner/${owner.id}`)
            .then(res => setField(res.data))
    })

    return (
        <div>
            <div style={{ 'padding': '10px' }}>
                <Link to='/'>
                    <Button>Volver</Button>
                </Link>
            </div>
            {field?.map((e) => {
                return (
                    <div key={e.id} >
                        <p>{e.name}</p>
                        <p>{e.sport}</p>
                        <p>{e.address}</p>
                    </div>
                )
            })}
        </div>
    )
}