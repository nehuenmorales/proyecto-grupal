import React from "react";
import { Button, Card, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import style from "./CardPlayer.module.css";


export default function CardPlayers(props) {
    console.log(props);
    return (

            <Card style={{ width: '18rem' }} className={style.cardPlayer}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
    )
}
