import React from 'react'
import style from './Carousel.module.css';
import CardCarousel from '../CardCarousel/CardCarousel';

const Carousel = ({ array }) => {
  return (
    <div className={style.carouselContainer} >
      {
        array.length > 0 ? 
          array.map( item => {
            return (
              <CardCarousel key={item.id} item={item} />
            )
          })
        : <p>No Hay resultados</p>
      }
    </div>
  )
}

export default Carousel