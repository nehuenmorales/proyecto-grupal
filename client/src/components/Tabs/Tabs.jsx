import React, { useEffect, useState } from 'react'
import { Nav, } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const Tabs = ({ match }) => {
  console.log(match)
  


  
  return (
    <Nav style={{
      "padding": "0 5em",
      "margin": "15px 0 30px 0"
    }} variant="pills" defaultActiveKey="/" >
      <Nav.Item >
        <Nav.Link eventKey="link-1" href={`/sport/${match.params.sport}`}>Turnos</Nav.Link>
      </Nav.Item>
      <Nav.Item >
        <Nav.Link eventKey="link-6" href={`/fields/${match.params.sport}`}>Canchas</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-2" href={`/sport/${match.params.sport}/players`}>Jugadores</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-3" href={`/sport/${match.params.sport}/complex`}>Complejos</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-4">Torneos</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-5" href={`/sport/${match.params.sport}/gamesIncomplete`}>FaltaUno</Nav.Link>
      </Nav.Item>
    </Nav>
  )
}

export default Tabs