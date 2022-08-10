import React from "react";
import { Link } from "react-router-dom";
import style from "./CardGamesInc.module.css"
import locationIcon from "../../../assets/icons/location.svg"

export default function CardGamesInc(item) {
  console.log('itemmm', item)
    return (
    <div key={item.id} className={style.cardCarousel}>
    <Link to ={`/sport/gamesIncomplete/${item.gameid}`}>
      {console.log(item)}
    {
        item.sport=="futbol"?
        <img src='https://ichef.bbci.co.uk/news/640/cpsprodpb/238D/production/_95410190_gettyimages-488144002.jpg'/>:null
      } 
      {
        item.sport=="basquet"?
        <img src='https://img.freepik.com/vector-premium/piso-cancha-basquet-linea-fondo-textura-madera_64749-2679.jpg?w=740'/>:null
      }
      {
        item.sport=="padel"?
        <img src='https://media.istockphoto.com/photos/tennis-blue-court-top-view-tennis-field-isolated-picture-id1078265942?b=1&k=6&m=1078265942&s=170667a&w=0&h=DgV6GtNGqIXRgjpu1WFaDLemZRuxadTILLf_WSr_R8k='/>:null
      }
      {
        item.sport=="tenis"?
        <img src='https://img.freepik.com/fotos-premium/cancha-tenis-arcilla_51195-1652.jpg?w=740'/>:null
      }
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
