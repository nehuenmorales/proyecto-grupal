import { useState } from "react";
import TenisFields from "./Tenis/fieldTenis"
import FutbolFields from "./Futbol/fieldFutbol";
import PadelFields from "./Padel/fieldPadel";
import BasquetFields from "./Basquet/fieldBasquet";
import Button from 'react-bootstrap/Button';

export default function CreateFields() {
  const [sport, setSport] = useState({
    type:""
  });

  const convertirTime = (state) => {
    console.log(state)
    var hour = state.slice(0,2)
    var minutes = state.slice(3,6)
    minutes = minutes/60
    let timeNumber = parseInt(hour) + parseFloat(minutes)
    return timeNumber
  }
  
  const selectSport=(e)=>{
    setSport({
      type:e.target.value,
    });
  }

  return (
    <div>
      <h3>Selecciona el deporte </h3>
      <span>
        <Button value={"futbol"} onClick={(e)=>selectSport(e)}>Futbol</Button>
        <Button value={"tenis"} onClick={(e)=>selectSport(e)}>Tenis</Button>
        <Button value={"padel"} onClick={(e)=>selectSport(e)}>Padel</Button>
        <Button value={"basquet"} onClick={(e)=>selectSport(e)}>Basquet</Button>
    

      </span>
      {sport.type==="futbol"?<FutbolFields convertirTime={convertirTime}/> :null}
      {sport.type==="tenis"?<TenisFields convertirTime={convertirTime}/> :null}
      {sport.type==="padel"?<PadelFields convertirTime={convertirTime}/> : null}
      {sport.type==="basquet"?<BasquetFields convertirTime={convertirTime}/> :null}

    </div>
    
        
  );

}
