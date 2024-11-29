import React from "react";
import { Link } from "react-router-dom";
import style from "./CardGamesInc.module.css"
import locationIcon from "../../../assets/icons/location.svg"

export default function CardGamesInc(item) {
    return (
    <div key={item.id} className={style.cardCarousel}>
    <Link to ={`/sport/gamesIncomplete/${item.gameid}`}>
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
    {/* <h4 className={style.title}>{item.complex_name}</h4>
    <div className={style.subtitle}>
    <p >{item.name}</p>
    <p>{item.start} hs</p>
    <p>{item.end} hs</p>
    <p>{item.freeplace} lugares</p>
    </div>
    <div className={style.location}>
      <img src={locationIcon}/>
      <p>{item.city}</p>
      
    </div> */}
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column'}}>
            <h4 className={style.title} style={{ color: 'white', fontSize: '25px', fontWeight: '500' }}> <i>{item.name}</i> </h4>
          </div>
          <div className={style.subtitle} style={{ color: 'white', marginLeft:'0px' }}>
            <p style={{marginTop:'10px', marginLeft:'0px'}}>{item.complexname}</p>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <p style={{ marginRight: '5px' }}>{item.date}</p>
              <p style={{color:'white', fontSize:'15px', fontWeight:'500'}}>Quedan {item.freeplace} lugares disponibles</p>
              
            </div>
            <p>{item.start}hs - {item.end}hs</p>


          </div>
        </div>
        <div className={style.location} style={{display:'flex', alignItems: 'center', flexDirection: 'row', width:'100%', justifyContent:'center', marginLeft:'10px'}}>
          <img src={locationIcon} />
          <p style={{marginBottom:'15px'}}>{item.city}</p>
        </div>
    </Link>
    
  </div>
)
}
