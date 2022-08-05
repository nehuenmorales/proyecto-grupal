import React from "react";
import { Link } from "react-router-dom";
import style from "./CardGamesInc.module.css"
import locationIcon from "../../../assets/icons/location.svg"

export default function CardGamesInc(item) {
    // return (
    //     <Link style={{"textDecoration":"none"}} to={`/sport/1234ss/gamesIncomplete/${props.gameid}`}>
    //         <div className={s.background}>
    //             <h2>{props.name}</h2>
    //             <p>{props.sport}</p>
    //             <spam>{props.start} </spam><spam>{props.end}</spam>
    //             <h4>Disponibles:{props.freeplace}</h4>
    //         </div>
    //     </Link>
    // )
    return (
    <div key={item.id} className={style.cardCarousel}>
    <Link to ={`/sport/gamesIncomplete/${item.gameid}`}>
    <img src='https://ichef.bbci.co.uk/news/640/cpsprodpb/238D/production/_95410190_gettyimages-488144002.jpg'/>
    <h4 className={style.title}>{item.complex_name}</h4>
    <div className={style.subtitle}>
    <p >{item.name}</p>
    <p>{item.start} hs</p>
    <p>{item.end} hs</p>
    <p>{item.freeplace} lugares</p>
    </div>
    <div className={style.location}>
      <img src={locationIcon}/>
      <p>{item.city}</p>
      
    </div>
    </Link>
    
  </div>
)
}
