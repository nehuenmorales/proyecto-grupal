import React, { useEffect } from "react";
//import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import getFields from '../../../redux/DetailField/DetailField-action';

export default function Detail() {
    const dispatch = useDispatch();
    // const { id } = useParams();

    let field = useSelector ((state) => state.getFieldsR.fields)

    useEffect(() => {
        dispatch(getFields())
    }, [dispatch])

   
    return (
    
        <div>
        {field && (
            field.length === 0 ? (
            <div>
                <p>There is no fields created</p>
                <p>Want to add some?</p>
            </div>
        ) : 
        (
            field.map((fie) => (
                <div key={fie.id} id={fie.id}>
                    <h2>Nombre:  {fie.name}</h2>
                    <h4>Deporte: {fie.sport}</h4>
                    <h4>Descripcion {fie.description} </h4>                             
                </div>
            ))
        )
        )}

    </div>
     )
}