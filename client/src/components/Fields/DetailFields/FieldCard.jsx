import React from 'react'
import Card from 'react-bootstrap/Card';
//import{useDispatch} from "react-redux"
import {Link} from "react-router-dom"
//import getAllFields from '../../../redux/DetailField/DetailField-action';



function FieldCard(props) {

    //const dispatch = useDispatch()

    return (
        <Link to={`/fields/${props.sport}/${props.id}`}>
            <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={props.image} />
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Card.Title>{props.sport}</Card.Title>
                {/* <Card.Title>{props.image}</Card.Title> */}
                <Card.Text>
                {props.description}
                </Card.Text>
                
            </Card.Body>
            </Card>
        </Link>
    );
}

export default FieldCard;