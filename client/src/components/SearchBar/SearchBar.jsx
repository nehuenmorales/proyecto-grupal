import React, { useState } from "react";
import { Button, Form, FormGroup} from "react-bootstrap";
import { useDispatch } from "react-redux"


export default function SearchBar ({sport,filtro}){
    const dispatch = useDispatch()
    const [input,setInput]=useState("")
    const onChange = (e)=>{
        setInput(e.target.value)
    }

    const onSubmit=()=>{
        if(filtro==="turnos"){
            dispatch(getSearchGames(input,sport))
        }
        if(filtro==="canchas"){}
        if(filtro==="jugadores"){}
        if(filtro==="torneos"){}
        if(filtro==="complejo"){}
        if(filtro==="faltauno"){}        
    }

    return ( 
        <>
        <FormGroup className="d-flex flex-start align-items-center" onSubmit={()=>onSubmit()} >
            <Form.Control className={style.input} size="sm" type="text" onChange={(e)=>onChange(e)} placeholder="Busca una cancha..." />
                {input?<Button variant="success" type="submit" className="m-1 text-white">Buscar</Button>:<Button variant="success" className="m-1 text-white" disabled >Buscar</Button>}
        </FormGroup>
        <h6>aca irian filtros</h6>
        </>
    )
}