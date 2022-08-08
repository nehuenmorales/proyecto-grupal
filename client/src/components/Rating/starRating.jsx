import React, {useState} from "react";
import {FaStar} from "react-icons/fa"
import "./starRating.css"
import {ratingComplex} from "../../redux/Complexes/ComplexAction"

export default function StarRating({complex}){
    
    const[rating,setRating]=useState(null)
    const[hover,setHover]=useState(null)

    const Submit=(e)=>{
        setRating(e.target.value)
        ratingComplex(complex,rating)
    }
    
    return(
        <div>
            {
                [...Array(5)].map((star,i)=>{
                    const ratingValue= i+1;
                    return(
                        <label>
                            <input
                                type="radio"
                                name="rating"
                                value={ratingValue}
                                onClick={(e)=>Submit(e)}    
                            />
                            <FaStar
                            className="star"
                            color={ratingValue<=(hover || rating) ? "#ffc107":"#e4e5e9"}
                            size={80}
                            onMouseEnter={()=>setHover(ratingValue)}
                            onMouseLeave={()=>setHover(null)}
                            />
                        </label>
                    )
                })
            }
            
        </div>
    )
}