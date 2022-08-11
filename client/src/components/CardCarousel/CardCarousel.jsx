import React from 'react';
import style from './CardCarousel.module.css';
import locationIcon from "../../assets/icons/location.svg"
import { Link } from 'react-router-dom';
const CardCarousel = ({ item }) => {


  console.log(item)
  return (
    <div key={item.id} className={style.cardCarousel}>
      <Link to={`/games/detail/${item.id}`}>
        {
          item.sport == "futbol" ?
            <img src='https://ichef.bbci.co.uk/news/640/cpsprodpb/238D/production/_95410190_gettyimages-488144002.jpg' /> : null
        }
        {
          item.sport == "basquet" ?
            <img src='https://img.freepik.com/vector-premium/piso-cancha-basquet-linea-fondo-textura-madera_64749-2679.jpg?w=740' /> : null
        }
        {
          item.sport == "padel" ?
            <img src='https://media.istockphoto.com/photos/tennis-blue-court-top-view-tennis-field-isolated-picture-id1078265942?b=1&k=6&m=1078265942&s=170667a&w=0&h=DgV6GtNGqIXRgjpu1WFaDLemZRuxadTILLf_WSr_R8k=' /> : null
        }
        {
          item.sport == "tenis" ?
            <img src='https://img.freepik.com/fotos-premium/cancha-tenis-arcilla_51195-1652.jpg?w=740' /> : null
        }
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {/* <div style={{ display: 'flex', flexDirection: 'column'}}>
          </div> */}
          <div className={style.subtitle} style={{ color: 'white', marginLeft: '0px', marginTop: '0px', paddingTop:'0px'}}>
            <h4 className={style.title} style={{ color: 'white', fontSize: '25px', fontWeight: '500', marginTop: '0px' }}> <i>{item.name}</i> </h4>
            <p style={{ marginTop: '0px', marginLeft: '0px' }}>{item.complexname}</p>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <p style={{ marginRight: '5px' }}>{item.date}</p>
              <p>{item.start}hs - {item.end}hs</p>
            </div>


          </div>
        </div>
        <div className={style.location} style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
          <img src={locationIcon} />
          <p style={{ marginBottom: '15px' }}>{item.city}</p>
        </div>
      </Link>

    </div>
  )
}

export default CardCarousel