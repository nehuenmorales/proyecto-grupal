import React, { useState } from "react";
import { Button, Form, FormGroup} from "react-bootstrap";
import { useDispatch } from "react-redux"
import { getSearchGames } from "../../redux/Games/gamesAction";
import { getSearchFields } from "../../redux/DetailField/DetailField-action";
import { getSearchGamesIncomplete } from "../../redux/GamesIncomplete/gamesIncompleteActions";
import { getSearchPlayer } from "../../redux/Players/GetPlayersAction";
import { getSearcTournament } from '../../redux/Tournament/tounamentAction'

import s from "./SearchBar.module.css"
import { getSearchComplex } from "../../redux/Complexes/ComplexAction";


export default function SearchBar ({sport,filtro}){
    const dispatch = useDispatch()
    const [input,setInput]=useState("")
    const onChange = (e)=>{
        console.log("voy cambiando", e.target.value)
        setInput(e.target.value)
    }

    const onSubmit=(e)=>{
         e.preventDefault()
         console.log("entro al submit", filtro)
         if(filtro==="turnos"){
            dispatch(getSearchGames(input,sport))
         }
        if(filtro==="canchas"){
            dispatch (getSearchFields(input, sport))
        }
        if(filtro==="jugadores"){
            dispatch(getSearchPlayer(input, sport))
        }
        if(filtro==="torneos"){
            dispatch(getSearcTournament(input, sport))
        }
        if(filtro==="complejos"){
            dispatch(getSearchComplex(input, sport))
        }
        if(filtro==="faltauno"){
            dispatch(getSearchGamesIncomplete(input, sport))
        }        
    }

    return ( 
        <>
        <FormGroup className="d-flex flex-start align-items-center" onSubmit={(e)=>onSubmit(e)} >
            <Form.Control className={s.input} size="sm" type="text" onChange={(e)=>onChange(e)} placeholder="Busca una cancha..." />
                <Button variant="success" type="submit" onClick={(e)=>onSubmit(e)} className="m-1 text-white">Buscar</Button>
        </FormGroup>
        <h6>aca irian filtros</h6>
        </>
    )
}