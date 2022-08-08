import React, { useEffect } from 'react'
import { Flex } from '@chakra-ui/react'
import './ProductsCarousel.css';
import { useDispatch } from 'react-redux';
import { getAllProducts } from '../../redux/Sponsors/SponsorsActions';
import { Link } from 'react-router-dom';
import { getGameSport } from '../../redux/NuevoGames/gamesAction';
import { useSelector } from 'react-redux';

const ProductsCarousel = ({sport}) => {
  
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(getAllProducts(sport));
  }, [dispatch]);
  
  const products= useSelector(state=>state.SponsorsReducer.AllProducts)
  
  return (
    <>
      <h3 className='carouselTitle'>Ofertas exclusivas para los miembros de FaltaUno!</h3>
      <Flex className='carouselContainer'>
        {
          products.map( product => {

            return (
              <div key={product.id} className='productCard'>
                <a href={product.link} target='_blank'>
                  <img src={product.image}/>
                  <h4> { product.title }</h4>
                  <p> { product.subtitle } </p>
                </a>
              </div>
            )

          })

        }
      </Flex>
    </>
  )


}

export default ProductsCarousel