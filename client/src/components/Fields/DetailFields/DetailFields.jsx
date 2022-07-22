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
                    <h2>Name:  {fie.name}</h2>
                    <h4>Sport: {fie.sport}</h4>
                    <h4>Available: {fie.available}</h4>
                    <h4>turn´s price: {fie.pricePerTurn}</h4>
                    <h4>Description: {fie.description}</h4>
                    <h4>duration: {fie.durationPerTurn}</h4>
                    <h4>Capacity: {fie.capacity}</h4>
                    <h4>Open: {fie.start}</h4>                             
                    <h4>Close: {fie.end}</h4>                                                          
                </div>
            ))
        )
        )}

    </div>
     )
}