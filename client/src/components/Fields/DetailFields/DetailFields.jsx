import React, { useEffect } from "react";
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import getFields from '../../../redux/DetailField/DetailField-action';

export default function Detail() {
    const dispatch = useDispatch();
    
    //let field = useSelector ((state) => state.getFieldsR.fields)

    // console.log(field)
    // console.log(getFields)

    useEffect(() => {
        dispatch(getFields())
    }, [dispatch])


    return (
    //     <div>
    //         <div>
    //             <h1>Entro al componente</h1>
    //         </div>
            
    //         {
    //             field.length === 0 ?
    //             <div>
    //                 <p>Loading...</p>
    //             </div>
    //             :
    //             <div>
                    
    //                 <h1>Cancha: {field.name.toUpperCase()}</h1>
    //                 <h2>Deporte: {field.sport.toUpperCase()}</h2>
    //                 <h3>Disponible:{field.available}</h3>
    //                 <h3>Precio hora:{field.pricePerHour}</h3>
    //                 <h3>Descripción: {field.description}</h3>
    //                 <h3>Capacidad: {field.capacity}</h3>
    //                 <h3>Comienzo: {field.start}</h3>
    //                 <h3>Final: {field.end}</h3>

    //             </div>
                
    //         }
    //     </div>
    <h1>hola</h1>
     )
}