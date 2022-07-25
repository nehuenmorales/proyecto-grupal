import React from "react";
import { Link } from "react-router-dom";


export default function CardComplex(props) {
    return (
        <Link>
            <div>
                <p>{props.name}</p>
                <img src = {props.image}/>
                <p>{props.description}</p>
                <p>{props.rating}</p>
                <p>{props.adress}</p>
            </div>
        </Link>
    )
}
