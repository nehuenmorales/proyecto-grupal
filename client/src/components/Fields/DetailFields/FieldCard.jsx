import React from 'react'
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import s from "./FieldCard.module.css";
import faltauno from '../../../utils/falta uno foto.png';


function FieldCard(props) {
    return (
        <div className={s.contenedorDeTodo}>
            <Link to={`/fields/detail/${props.id}`} style={{ border: 'none', textDecoration:'none' }}>
                <Card className={s.separar} style={{ width: '300px', borderRadius: '15px', border: 'none', textDecoration:'none', backgroundColor:'#111825' }}>
                    {
                        props.image ? 
                        <Card.Img className={s.NewImage} variant="top" src={props.image} />
                        :
                        <Card.Img className={s.NewImage} variant="top" src={faltauno} />
                    }
                    <Card.Body className={s.bodyCard} >
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginBottom:'10px' }}>
                            <Card.Title className={s.title} style={{ fontWeight: '500', fontSize: '25px', margin: '0px' }}>{props.name}</Card.Title>
                            <Card.Text className={s.text} style={{ fontWeight: '100' }}>{props.complexId}</Card.Text>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                            <Card.Text style={{marginBottom:'5px'}} className={s.duration}>Duración del turno: {props.durationPerTurn}hs</Card.Text>
                            <Card.Title style={{ display: 'flex', flexDirection: 'column' }} className={s.price}>
                                ${props.pricePerTurn}
                            </Card.Title>
                        </div>


                    </Card.Body>
                </Card>
            </Link>

        </div>
    );
}

export default FieldCard;