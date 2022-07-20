import React from "react";
import { Link } from "react-router-dom";
//importar foto canchita

export default function CardGamesInc(props) {
    console.log(props.gameid,"id")
    return (
        <Link to={`/gamesIncomplete/${props.gameid}`}>
            <div>
                <h2>name:{props.name}</h2>
                <h4>sport:{props.sport}</h4>
                <h4>freeplace:{props.freeplace}</h4>
                <h4>start:{props.start}</h4>
                <h4>end:{props.end}</h4>
            </div>
        </Link>
    )
}



// "id": 1,
// "fieldId": 1,
// "enrolled_amount": "2",
// "freeplace": "9",
// "name": "cancha 1",
// "sport": "futbol",
// "available": "true",
// "pricePerHour": 120,
// "description": "esta cancha es de prueba 1",
// "capacity": 11,
// "start": "8",
// "end": "20",
// "complexId": null

//type