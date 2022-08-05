import React from 'react'
import Card from 'react-bootstrap/Card';
import {Link} from "react-router-dom"
import s from "./FieldCard.module.css"



function FieldCard(props) {
    console.log(props)
    return (
        <Link to={`/fields/detail/${props.id}`}>
            <Card className={s.separar}style={{ width: '18rem' }}>
            <Card.Img className={s.NewImage} variant="top" src={props.image} />
            <Card.Body className={s.bodyCard}>
                <Card.Title className={s.title}>{props.name}</Card.Title>
                <Card.Text className={s.text}>
                {props.description}
                </Card.Text>
            </Card.Body>
            </Card>
        </Link>
    );
}

export default FieldCard;