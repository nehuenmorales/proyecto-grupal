import React from "react";
import { Link } from "react-router-dom";
import s from "./CardGamesInc.module.css"

export default function CardGamesInc(props) {
    return (
        <Link to={`/sport/gamesIncomplete/${props.gameid}`}>
            <div className={s.background}>
                <h2>{props.name}</h2>
                <p>{props.sport}</p>
                <spam>{props.start} </spam><spam>{props.end}</spam>
                <h4>Disponibles:{props.freeplace}</h4>
            </div>
        </Link>
    )
}
