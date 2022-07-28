import React from 'react';
import style from './CardCarousel.module.css';
import locationIcon from "../../assets/icons/location.svg"
import { Link } from 'react-router-dom';

const CardCarousel = ({ item, type }) => {
  console.log(item, type, 'desde cardacarousel')

  if (type === 'games') {
    return (
      <Link key={item.gameid} to={`/sport/gamesIncomplete/${item.gameid}`}>
        <div className={style.cardCarousel}>
          <img src='https://ichef.bbci.co.uk/news/640/cpsprodpb/238D/production/_95410190_gettyimages-488144002.jpg' />
          <h4 className={style.title}>{item.name}</h4>
          <div className={style.subtitle}>
            <p>{item.sport}</p> 
            <span>Comienzo: {item.start}</span><br/>
            <span>Termina: {item.end}</span>
            <p className={style.freeOrBucket}>Disponibles:{item.freeplace}</p>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <div key={item.id} className={style.cardCarousel}>
      <img src='https://ichef.bbci.co.uk/news/640/cpsprodpb/238D/production/_95410190_gettyimages-488144002.jpg' />
      <h4 className={style.title}>{item.complex_name}</h4>
      <div className={style.subtitle}>
        <p >{item.name}</p>
        <p>{item.start} hs</p>
        <p>{item.end} hs</p>
      </div>
      <div className={style.location}>
        <img src={locationIcon} />
        <p>{item.adress}</p>

      </div>
    </div>
  )


}

export default CardCarousel