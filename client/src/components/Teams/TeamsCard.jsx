import React from "react";
import s from "./diseñoTeams/teamsCard.module.css"
import { Link } from "react-router-dom";


export default function TeamsCard({props}) {
    // {
    //     "id": 4,
    //     "name": "Real Madrid",
    //     "rating": null,
    //     "elo": 0,
    //     "image": "",
    //     "sport": "futbol",
    //     "amountPlayers": 11,
    //     "gameId": null
    //   },
    
    return (
        <div className={s.container}>
                <Link>
                {props.image?<div className={s.image} style={{"backgroundImage":`url(${props.image})`}}></div>:<div className={s.defaultImage}></div> }
                    </Link>
                <div className={s.points}>
                {props.rating===5?<h5><i class="fa-solid fa-star" style={{color:"gold"}}  ></i><i class="fa-solid fa-star" style={{"color":"gold"}} ></i><i class="fa-solid fa-star" style={{"color":"gold"}} ></i><i class="fa-solid fa-star" style={{"color":"gold"}} ></i><i class="fa-solid fa-star" style={{"color":"gold"}} ></i></h5>
                :props.rating===4?<h5><i class="fa-solid fa-star" style={{"color":"gold"}} ></i><i class="fa-solid fa-star" style={{"color":"gold"}} ></i><i class="fa-solid fa-star" style={{"color":"gold"}} ></i><i class="fa-solid fa-star" style={{"color":"gold"}} ></i></h5>
                :props.rating===3?<h5><i class="fa-solid fa-star" style={{"color":"gold"}} ></i><i class="fa-solid fa-star" style={{"color":"gold"}} ></i><i class="fa-solid fa-star" style={{"color":"gold"}} ></i></h5>
                :props.rating===2?<h5><i class="fa-solid fa-star" style={{"color":"gold"}} ></i><i class="fa-solid fa-star" style={{"color":"gold"}} ></i></h5>
                :props.rating===1?<i class="fa-solid fa-star" style={{"color":"gold"}} ></i>:<h5><i class="fa-solid fa-star" style={{"color":"gold"}} ></i><i class="fa-solid fa-star" style={{"color":"gold"}} ></i><i class="fa-solid fa-star" style={{"color":"gold"}} ></i><i class="fa-solid fa-star" style={{"color":"gold"}} ></i><i class="fa-solid fa-star" style={{"color":"gold"}} ></i></h5>}
                <h5>Puntos: {props.elo}</h5>
                </div>
                <h2 className={s.teamname}>{props.name}</h2>
        </div>
        
    )
}