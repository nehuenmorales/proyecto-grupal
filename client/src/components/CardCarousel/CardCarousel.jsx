import React from 'react';
import style from './CardCarousel.module.css';
import locationIcon from "../../assets/icons/location.svg"
const CardCarousel = ({ item }) => {
  console.log(item)


  return (
    <div key={item.id} className={style.cardCarousel}>
      <img src='https://ichef.bbci.co.uk/news/640/cpsprodpb/238D/production/_95410190_gettyimages-488144002.jpg'/>
      <h4 className={style.title}>{item.complex_name}</h4>
      <div className={style.subtitle}>
      <p >{item.name}</p>
      <p>{item.start} hs</p>
      <p>{item.end} hs</p>
      </div>
      <div className={style.location}>
        <img src={locationIcon}/>
        <p>{item.adress}</p>
        
      </div>
    </div>
  )
}

export default CardCarousel