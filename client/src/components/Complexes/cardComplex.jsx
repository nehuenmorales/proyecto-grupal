import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";


export default function CardComplex(props) {
	console.log(props)
	return (
		<Card style={{ width: '20rem', textTransform: 'capitalize' }}>
			<Link to={`/sport/futbol/complex/${props.name}`}>
				<Card.Img variant="top" src={props.image} />
				<Card.Body>
					<Card.Title>{props.name}</Card.Title>
					<Card.Text>
						{props.description}
					</Card.Text>
					<Card.Text>
						{props.rating}
					</Card.Text>
					<Card.Text>
						{props.adress}
					</Card.Text>
				</Card.Body>
			</Link>
		</Card>
	)
}
