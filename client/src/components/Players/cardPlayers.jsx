import React from "react";
import { Link } from "react-router-dom";


export default function CardPlayers(props) {
    return (
        <Link>
            <div>
                <p>{props.name}</p>
                <p>{props.lastName}</p>
                <p>{props.username}</p>
                <p>{props.city}</p>
                <p>{props.elo}</p>
            </div>
        </Link>
    )
}
