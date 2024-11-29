import React from "react";
import s from "./diseñoTeams/teamsCard.module.css"
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import DefaultImage from "../../utils/TeamsFutbolbasic.jpg"
import{StarIcon} from "@chakra-ui/icons"


export default function TeamsCard({props}) {
    // {
    //     "id": 4,
    //     "name": "Real Madrid",
    //     "rating": null,
    //     "elo": 0,
    //     "image": "",
    //     "sport": "futbol",
    //     "amountPlayers": 11,
    //     "gameId": null
    //   },
    
    return (
        <Card className={s.separar}>
            <Card.Img variant="top" className={s.NewImage} src={props.image?props.image:DefaultImage} />
            <Card.Body className={s.bodyCard}>
                <Card.Title className={s.title}>{props.name}</Card.Title>
                <div className={s.contenedorDeTodo}>
                {Array(5)
                    .fill('')
                    .map((_, i) => (
                    <StarIcon
                    key={i}
                    color={i < props.rating ? 'gold' : 'gray.300'}
                    />
				))}
                <h5 className={s.puntos}>{props.elo} puntos</h5>  
                </div>
               
            </Card.Body>
        </Card>
        
    )
}





// function BasicExample() {
//   return (
//     <Card style={{ width: '18rem' }}>
//       <Card.Img variant="top" src="holder.js/100px180" />
//       <Card.Body>
//         <Card.Title>Card Title</Card.Title>
//         <Card.Text>
//           Some quick example text to build on the card title and make up the
//           bulk of the card's content.
//         </Card.Text>
//         <Button variant="primary">Go somewhere</Button>
//       </Card.Body>
//     </Card>
//   );
// }

// export default BasicExample;