import React from 'react'
import style from './Carousel.module.css';
import CardCarousel from '../CardCarousel/CardCarousel';
import { Link } from "react-router-dom"

const Carousel = ({ array, type }) => {
  console.log(array, type)

  if (type === 'games') {
    return (
      <div className={style.carouselContainer} >
        {
          array?.length > 0 ?
            array.map((item, index) => {
              return (
                <Link key={index} to={"/fields"}>
                  <CardCarousel key={index} item={item} type='games' />
                </Link>
              )
            })
            : <p>No Hay resultados</p>
        }
      </div>
    )
  }
  return (
    <div className={style.carouselContainer} >
      {
        array?.length > 0 ?
          array.map(item => {
            return (
              <Link key={item.id} to={"/fields"}>
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