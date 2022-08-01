import React from 'react'
import Card from 'react-bootstrap/Card';
import {Link} from "react-router-dom"



function FieldCard(props) {
    console.log(props)
    return (
        <Link to={`/fields/detail/${props.id}`}>
            <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={props.image} />
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Card.Title>{props.sport}</Card.Title>
                <Card.Text>
                {props.description}
                </Card.Text>
                
            </Card.Body>
            </Card>
        </Link>
    );
}

export default FieldCard;