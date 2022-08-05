// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getFieldById } from "../../../redux/DetailField/DetailField-action";
// import VerticalNavbar from "../../VerticalNavbar/VerticalNavbar";



// export default function FieldById({match}) {
//     const id = match.params.id;
//     const dispatch = useDispatch();
//     const detail = useSelector(state => state.getFieldsR.detailFields);
//     const history = useHistory();

//   useEffect(()=>{
//       dispatch(getFieldById(id))
//     },[dispatch,id])
//     console.log(detail, "detalle")

//     function HandleSelect(e){
//         e.preventDefault(e)
//         history.push(`/games/detail/${e.target.value}`)
        
//     }

//     return (
//         <div >
//         <VerticalNavbar/>
//         <h2>{detail[0]?.name}</h2>
//         <h2>{detail[0]?.sport}</h2>
//         <h2>{detail[0]?.open}</h2>
//         <h2>{detail[0]?.close}</h2>
//         <h2>{detail[0]?.capacity}</h2>
//         {      
//                     <select onChange={(e)=>{HandleSelect(e)}}>
//                     <option hidden>Turnos Disponibles</option>
//                     {detail?.map((e) => {
//                         return (
//                             <option key={e.id} value={e.id}>{e.date}{e.start}{e.end}</option>
//                         )
//                     })}
//                     </select>
//         }
//     </div>)
// }

// import './DetailComplex.css';
import React, { useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux';
import { Col, Container, Row, Carousel, Button } from 'react-bootstrap';
import { getFieldById } from "../../../redux/DetailField/DetailField-action";
import VerticalNavbar from '../../VerticalNavbar/VerticalNavbar';
import Map from '../../Map/Map';
import { BiMapPin } from 'react-icons/bi';
import {Flex} from "@chakra-ui/react"
import { useHistory } from 'react-router-dom';


const FieldById = ({ match }) => {
//   Obtener el detalle del complejo
    const id  = match.params.id;
    const dispatch = useDispatch();
    const detail = useSelector(state => state.getFieldsR.detailFields);
    const history = useHistory();

   useEffect(()=>{
      dispatch(getFieldById(id))
    },[dispatch,id])

    function HandleSelect(e){
        e.preventDefault(e)
        history.push(`/games/detail/${e.target.value}`)
    }
    console.log("detail",detail)
  return (
    <Flex>
      <VerticalNavbar />
    <Container style={{ color: 'white' }}>
      <Carousel className='imageContainer'>
        <Carousel.Item className='imageItemContainer'>
          <img
            className="d-block w-100"
            src={detail[0]?.image}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className='imageItemContainer'>
          <img
            className="d-block w-100"
            src="https://donpotrero.com/img/posts/2/medidas_lg.jpg"
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className='imageItemContainer'>
          <img
            className="d-block w-100"
            src="https://donpotrero.com/img/posts/2/medidas_lg.jpg"
            alt="Third slide"
            />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <Row className='informationContainer'>
        <Col>
          <h1>{detail[0]?.name}</h1>
          <p>Ubicación del complejo</p>
          <Map zoom={16} center={{ lat: detail[0]?.lat, lng: detail[0]?.lng }} margin='0 0 10px 0'/>
          <div className='locationInformation'>
            <BiMapPin color='#128DFF'/>
            <p>{detail[0]?.address}</p>
          </div>
        </Col>
        <Col>
          <h3 className='titleDescription'>Descripción de la cancha</h3>
          <p>{detail[0]?.description}</p>
          <Button className='text-white w-100 m-1' variant='success' size='lg'>Contactanos!</Button>
        </Col>
      </Row>
    </Container>
  </Flex>
  )
}

export default FieldById;