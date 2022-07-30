import React, { useState } from "react";
import { Button, Form, FormGroup} from "react-bootstrap";
import { useDispatch } from "react-redux"
import { getSearchGames } from "../../redux/Games/gamesAction";
import { getSearchFields } from "../../redux/DetailField/DetailField-action";
import { gamesIncompleteOrderByAmount, getSearchGamesIncomplete } from "../../redux/GamesIncomplete/gamesIncompleteActions";
import { getSearchPlayer, orderByElo } from "../../redux/Players/GetPlayersAction";
import { getSearcTournament } from '../../redux/Tournament/tounamentAction'
import {gamesOrderByPrice} from '../../redux/Games/gamesAction'

import s from "./SearchBar.module.css"
import { getSearchComplex, orderComplexRating } from "../../redux/Complexes/ComplexAction";


export default function SearchBar ({sport,filtro,setFilter}){
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
    const orderPlayers=(e)=>{
        e.preventDefault()
        dispatch(orderByElo())
    }
    const orderByPrice=(e)=>{
        e.preventDefault()
        dispatch(gamesOrderByPrice(e.target.value))
        
    }

    const orderByRating=(e)=>{
        e.preventDefault()
        dispatch(orderComplexRating(e.target.value))
    }
    const orderByAmountGI=(e)=>{
        e.preventDefault()
        dispatch(gamesIncompleteOrderByAmount(e.target.value))
    }

    return ( 
        <>
        <FormGroup className="d-flex flex-start align-items-center" onSubmit={(e)=>onSubmit(e)} >
            <Form.Control className={s.input} STYLE='color=#FFFFFF' size="sm" type="text" onChange={(e)=>onChange(e)} placeholder={`Buscar ${filtro}...`}/>
                <Button variant="success" type="submit" onClick={(e)=>onSubmit(e)} className="m-1 text-white">Buscar</Button>
        </FormGroup>


        {filtro==="jugadores"?<button onClick={(e)=>orderPlayers(e)}>Mejores jugadores</button>:null}
        {filtro === "turnos"? 
        <select onChange={(e) => {orderByPrice(e)}}  >
            <option selected disabled >
              Ordenar por precio
            </option>
            <option value={"mayorAmenor"}>
              Mayor precio
            </option>
            <option value={"menorAmayor"}>
              Menor precio
            </option>
          </select>
          : null 
                }
        {filtro === "complejos"? 
        <select onChange={(e) => {orderByRating(e)}}  >
            <option selected disabled >
              Ordenar por rating
            </option>
            <option value={"mayorAmenor"}>
              Mayor rating
            </option>
            <option value={"menorAmayor"}>
              Menor rating
            </option>
          </select>
          : null 
                }
        {filtro === "faltauno"? 
        <select onChange={(e) => {orderByAmountGI(e)}}  >
            <option selected disabled >
              Ordenar por cupos disponibles
            </option>
            <option value={"mayorAmenor"}>
              Mayor cupos 
            </option>
            <option value={"menorAmayor"}>
              Menor cupos 
            </option>
          </select>
          : null 
                }
        </>
    )
}
{/* <select
     classN{(e) => {
              orderScore(e);
            }}
          >ame={}
            onChange=
            <option selected disabled className={c.option}>
              By score
            </option>

            <option value={1} className={c.option}>
              Best Scores
            </option>
            <option value={-1} className={c.option}>
              Lowest Scores
            </option>
          </select> */}