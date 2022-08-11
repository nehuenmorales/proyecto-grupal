import React from 'react'
import { Button, Nav } from 'react-bootstrap'
import s from "./Tabs.module.css"
import { useRouteMatch } from 'react-router-dom';
import { Link } from 'react-router-dom'

const Tabs = ({ match }) => {
  return (
    <Nav className={s.contenedor} style={{
      "padding": "5px 20px 5px 40px",
      'width': '630px',
      margin: '10px 0 40px 0',
      color:'128DFF'
    }} variant="pills" defaultActiveKey="/" >
      <Nav.Item className={s.button} >
      <Nav.Link className={s.letras} style={{color:'rgba(18, 141, 255, 1)'}} href={`/sport/${match.params.sport}`}>Turnos</Nav.Link>
      </Nav.Item>
      <Nav.Item className={s.button}>
        <Nav.Link className={s.letras} style={{color:'rgba(18, 141, 255, 1)'}} eventKey="link-6" href={`/fields/${match.params.sport}`}>Canchas</Nav.Link>
      </Nav.Item>
      <Nav.Item className={s.button}>
        <Nav.Link className={s.letras} style={{color:'rgba(18, 141, 255, 1)'}} eventKey="link-2" href={`/sport/${match.params.sport}/players`}>Jugadores</Nav.Link>
      </Nav.Item>
      <Nav.Item className={s.button}>
        <Nav.Link className={s.letras} style={{color:'rgba(18, 141, 255, 1)'}} eventKey="link-3" href={`/sport/${match.params.sport}/complex`}>Complejos</Nav.Link>
      </Nav.Item>
      <Nav.Item className={s.button}>
        <Nav.Link className={s.letras} style={{color:'rgba(18, 141, 255, 1)'}} eventKey="link-5" href={`/sport/${match.params.sport}/gamesIncomplete`}>FaltaUno</Nav.Link>
      </Nav.Item>
    </Nav>

    

  )
}

export default Tabs