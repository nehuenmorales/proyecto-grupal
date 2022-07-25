import React, { useEffect } from "react";
//import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import {getAllFields} from '../../../redux/DetailField/DetailField-action';
import FieldCard from "./FieldCard";


export default function DetailFields({match}) {
    const dispatch = useDispatch();
    console.log(match.params.sport, "detalle")
    const field = useSelector ((state) => state.getFieldsR.fields)

    useEffect(() => {
        dispatch(getAllFields(match.params.sport))
    }, [dispatch])
   
    return (
        <div>
            {
                field?.map((e) => {
                    return (
                        <FieldCard 
                        key={e.id}
                        name={e.name}
                        sport={e.sport}
                        description={e.description}
                        capacity={e.capacity}
                        image={e.image}
                        />
                    )
                })
            }
        </div>
     )
}