import React, { useRef, useState } from "react";
import { Center, Flex } from '@chakra-ui/react'
import './ProductsCarousel.css';
import { Link } from 'react-router-dom';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


const ProductsCarousel = () => {
  const products = [
    {
      id: 1,
      title: 'Paleta Padel - Wilson Gran',
      subtitle: '20% de descuento',
      image: 'https://padelmagazine.it/templates/yootheme/cache/BELA_WILSON_1-9d03ea31.jpeg',
      link: 'http://google.com',
    },
    {
      id: 2,
      title: 'Argentum 19 Competition',
      subtitle: '15% de descuento',
      image: 'https://www.analisisdigital.com.ar/sites/default/files/styles/noticias_front_desktop/public/imagenNoticiaDigital/bolo_0.jpg',
      link: 'http://google.com',
    },
    {
      id: 3,
      title: 'Combo Raqueta + Pelota de Tenis',
      subtitle: '5% de descuento',
      image: 'https://cdn.pixabay.com/photo/2021/06/04/06/54/racket-6308994_1280.jpg',
      link: 'http://google.com',
    },
    {
      id: 4,
      title: 'Pelota de Basquet Molten GG7X',
      subtitle: '20% off',
      image: 'https://static.wixstatic.com/media/40f312_e9d5439746c74198822fd62d4a74f537~mv2.jpg/v1/fill/w_1400,h_689,al_c,q_85,enc_auto/40f312_e9d5439746c74198822fd62d4a74f537~mv2.jpg',
      link: 'http://google.com',
    },
    {
      id: 5,
      title: 'Pelota de Basquet Molten GG7X',
      subtitle: '20% off',
      image: 'https://static.wixstatic.com/media/40f312_e9d5439746c74198822fd62d4a74f537~mv2.jpg/v1/fill/w_1400,h_689,al_c,q_85,enc_auto/40f312_e9d5439746c74198822fd62d4a74f537~mv2.jpg',
      link: 'http://google.com',
    },
    {
      id: 6,
      title: 'Pelota de Basquet Molten GG7X',
      subtitle: '20% off',
      image: 'https://static.wixstatic.com/media/40f312_e9d5439746c74198822fd62d4a74f537~mv2.jpg/v1/fill/w_1400,h_689,al_c,q_85,enc_auto/40f312_e9d5439746c74198822fd62d4a74f537~mv2.jpg',
      link: 'http://google.com',
    },
    {
      id: 7,
      title: 'Pelota de Basquet Molten GG7X',
      subtitle: '20% off',
      image: 'https://static.wixstatic.com/media/40f312_e9d5439746c74198822fd62d4a74f537~mv2.jpg/v1/fill/w_1400,h_689,al_c,q_85,enc_auto/40f312_e9d5439746c74198822fd62d4a74f537~mv2.jpg',
      link: 'http://google.com',
    },
  ]


  return (
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
                    <h4> {product.title}</h4>
                    <p> {product.subtitle} </p>
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