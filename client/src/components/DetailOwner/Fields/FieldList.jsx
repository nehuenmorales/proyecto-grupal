import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from 'react-router-dom'
import Button from "react-bootstrap/esm/Button";
import "./FieldList.css"

export default function FieldList() {
    const [field, setField] = useState([])
    let owner = useSelector((state) => state.getOwnerReducer.owner)
    console.log('soy fieldddd', field)
    useEffect(() => {
        axios.get(`https://falta-uno-1.herokuapp.com/owner/getFieldByOwner/${owner.id}`)
            .then(res => setField(res.data))
    }, [])

    return (
        <div className="fieldlist-container">
            <div style={{ 'padding': '10px' }}>
                <Link to='/'>
                    <Button>Volver</Button>
                </Link>
            </div>
            <h3>Tus canchas</h3>
            {field?.map((e) => {
                return (
                e.fields?.map((el) => {
                    console.log('el', el)
                    return (
                  <div key={el.id} >
                    
                            <p>{el.name}</p>
                            <p>{el.sport}</p>
                        </div>
                    )
                }))
            })}
        </div>
    )
}