import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import s from "./cardComplex.module.css"
import{Box} from "@chakra-ui/react"
import{StarIcon} from "@chakra-ui/icons"
import locationIcon from "../../assets/icons/location.svg"


export default function CardComplex(props) {
	return (
		<Card className={s.separar} style={{backgroundColor: 'rgba(12, 19, 31, 1)'}}>
			<Link to={`/sport/futbol/complex/${props.name}`} style={{backgroundColor: 'rgba(12, 19, 31, 1)'}}>

			<Card.Img className={s.NewImage} variant="top" src={props.image} />
			<Card.Body className={s.bodyCard} >
				<Card.Title className={s.title}>{props.name}</Card.Title>
				<Box display='flex' mt='2' alignItems='center' >
          		{Array(5)
            .fill('')
            .map((_, i) => (
				<StarIcon
                key={i}
                color={i < props.rating ? 'gold' : 'gray.300'}
				/>
				))}
          <Box as='span' ml='2' color='gray.600' fontSize='sm'>
            {props.reviews} reviews
          </Box>
		  </Box>
				<Card.Text className={s.text}>
				<img src={locationIcon}/> {props.state}
				</Card.Text>
			</Card.Body>
			</Link>
		</Card>
	)
}
