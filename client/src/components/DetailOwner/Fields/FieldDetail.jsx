import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFieldDetail } from "../../../redux/OwnerFields/FieldDetailOwner/FieldDetailAction"

export default function FieldDetail({ id }) {
    const dispatch = useDispatch();
    let field = useSelector((state) => state.fieldDetailReducer.fieldDetail)
    useEffect(() => {
        dispatch(getFieldDetail(id));
        console.log(field, 'soy yoooo')
    }, [])

    return (
        <div>
            <div>
                <Link to='/' style={{ 'padding': '10px', 'width': '25%', 'margin': '20px 10px 10px 10px' }}>
                    <Button style={{ 'marginTop': '15px' }}>Volver</Button>
                </Link>
            </div>
            <div>
                <h1>Detail field</h1>
            </div>
        </div>
    )
}