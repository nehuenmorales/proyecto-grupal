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
      {sport.type==="futbol"?<FutbolFields/> :null}
      {sport.type==="tenis"?<TenisFields/> :null}
      {sport.type==="padel"?<PadelFields/> : null}
      {sport.type==="basquet"?<BasquetFields/> :null}

    </div>
    
        
  );

}
