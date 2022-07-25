import React from 'react'
import style from './Carousel.module.css';
import CardCarousel from '../CardCarousel/CardCarousel';
import {Link} from "react-router-dom"

const Carousel = ({ array }) => {
  return (
    <div className={style.carouselContainer} >
      {
        array.length > 0 ? 
          array.map( item => {
            return (
              <Link to={"/fields"}>
              <CardCarousel key={item.id} item={item} />
              </Link>
            )
          })
        : <p>No Hay resultados</p>
      }
    </div>
  )
}

export default Carousel