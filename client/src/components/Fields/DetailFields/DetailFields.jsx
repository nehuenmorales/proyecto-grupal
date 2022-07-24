import React, { useEffect } from "react";
//import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import {getAllFields} from '../../../redux/DetailField/DetailField-action';
import FieldCard from "./FieldCard";


export default function Detail() {
    const dispatch = useDispatch();

    const field = useSelector ((state) => state.getFieldsR.fields)

    useEffect(() => {
        dispatch(getAllFields())
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
    //     <div>
    //     {field && (
    //         field.length === 0 ? (
    //         <div>
    //             <p>There is no fields created</p>
    //             <p>Want to add some?</p>
    //         </div>
    //     ) : 
    //     (
    //         field?.map((fie,index) => {
                
    //                 <div key={index}>
                       
    //                         <FieldCard
    //                             id={fie.id}
    //                             name={fie.name}
    //                             pricePerTurn={fie.pricePerTurn}
    //                             description={fie.description}
    //                             capacity={fie.capacity}
    //                             open={fie.open}
    //                             close={fie.close}
    //                             image={fie.image}                                
    //                         />
                        
                        
    //                 </div>
                    
                
    //         }
    //         )
    //     )
    //     )}

    // </div>
     )
}