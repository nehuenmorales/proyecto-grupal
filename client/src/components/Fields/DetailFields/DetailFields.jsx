import React, { useEffect } from "react";
//import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import {getAllFields} from '../../../redux/DetailField/DetailField-action';
import FieldCard from "./FieldCard";


export default function DetailFields({match}) {
    const dispatch = useDispatch();
    const field = useSelector ((state) => state.getFieldsR.fields)
    const sport = match.params.sport;
 console.log(sport, 'soy el parametro')
    useEffect(() => {
        dispatch(getAllFields(sport))
    }, [dispatch,sport])
   
   
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