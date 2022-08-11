import React, { useEffect } from "react";
import './ProductsCarousel.css';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import { useDispatch } from 'react-redux';
import { getAllProducts } from '../../redux/Sponsors/SponsorsActions';
import { getGameSport } from '../../redux/NuevoGames/gamesAction';
import { useSelector } from 'react-redux';

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


const ProductsCarousel = () => {
  
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  
  const products= useSelector(state=>state.SponsorsReducer.AllProducts)
  
  return (
    // <>
    //   <h3 className='carouselTitle'>Ofertas exclusivas para los miembros de FaltaUno!</h3>
    //   <Flex className='carouselContainer'>
    //     {
    //       products.map( product => {

    //         return (
    //           <div key={product.id} className='productCard'>
    //             <a href={product.link} target='_blank'>
    //               <img src={product.image}/>
    //               <h4> { product.name }</h4>
    //               <p> { product.description } </p>
    //             </a>
    //           </div>
    //         )

    //       })

    //     }
    //   </Flex>
    // </>
    <>
      <h3 className='carouselTitle'>Ofertas exclusivas para los miembros de FaltaUno!</h3>
      <Swiper
        slidesPerView={3}
        spaceBetween={0}
        slidesPerGroup={3}
        loop={true}
        loopFillGroupWithBlank={false}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {
          products.map(product => {
            return (
              <SwiperSlide key={product.id}>
                <div key={product.id} className='productCard'>
                  <a href={product.link} target='_blank'>
                    <img src={product.image} />
                    <h4> {product.name}</h4>
                    <p> {product.description} </p>
                  </a>
                </div>
              </SwiperSlide>
            )

          })

        }
      </Swiper>
    </>
  )


}

export default ProductsCarousel