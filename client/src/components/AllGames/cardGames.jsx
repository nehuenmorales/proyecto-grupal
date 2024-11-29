import React from "react";
import { Link } from "react-router-dom";


export default function CardGames(props) {
    return (
        <Link>
            <div>
                {/* <h2>{props.name}</h2> */}
                <p>{props.name}</p>
                <spam>{props.start} </spam><spam>{props.end}</spam><spam>{props.date}</spam>
                
            </div>
        </Link>
    )
}
