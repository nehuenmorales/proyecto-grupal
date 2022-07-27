import React, { useState } from "react";
import { Button, Form, FormGroup} from "react-bootstrap";
import { useDispatch } from "react-redux"
import { getSearchGames } from "../../redux/Games/gamesAction";


export default function SearchBar ({sport,filtro}){
    const dispatch = useDispatch()
    const [input,setInput]=useState("")
    const onChange = (e)=>{
        setInput(e.target.value)
    }

    const onSubmit=(e)=>{
        e.preventDefault()
        if(filtro==="turnos"){
            dispatch(getSearchGames(input,sport))
        }
        if(filtro==="canchas"){
            dispatch (getSearchField(input, sport))
        }
        if(filtro==="jugadores"){
            dispatch(getSearchPlayer(input, sport))
        }
        if(filtro==="torneos"){
            dispatch(getSearchTournament(input, sport))
        }
        if(filtro==="complejo"){
            dispatch(getSearchComplex(input, sport))
        }
        if(filtro==="faltauno"){
            dispatch(getsearchFatltauno(input, sport))
        }        
    }

    return ( 
        <>
        <FormGroup className="d-flex flex-start align-items-center" onSubmit={(e)=>onSubmit(e)} >
            <Form.Control size="sm" type="text" onChange={(e)=>onChange(e)} placeholder="Busca una cancha..." />
                {input?<Button variant="success" type="submit" className="m-1 text-white">Buscar</Button>:<Button variant="success" className="m-1 text-white" disabled >Buscar</Button>}
        </FormGroup>
        <h6>aca irian filtros</h6>
        </>
    )
}