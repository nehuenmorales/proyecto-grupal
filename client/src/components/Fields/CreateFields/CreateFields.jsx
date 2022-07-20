import { useState } from "react";
import { useDispatch } from "react-redux";
import TenisFields from "./Tenis/fieldTenis"
import FutbolFields from "./Futbol/fieldFutbol";
import PadelFields from "./Padel/fieldPadel";
import BasquetFields from "./Basquet/fieldBasquet";

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
        <button value={"futbol"} onClick={(e)=>selectSport(e)}>Futbol</button>
        <button value={"tenis"} onClick={(e)=>selectSport(e)}>Tenis</button>
        <button value={"padel"} onClick={(e)=>selectSport(e)}>Padel</button>
        <button value={"basquet"} onClick={(e)=>selectSport(e)}>Basquet</button>

      </span>
      {sport.type==="futbol"?<FutbolFields/> :null}
      {sport.type==="tenis"?<TenisFields/> :null}
      {sport.type==="padel"?<PadelFields/> : null}
      {sport.type==="basquet"?<BasquetFields/> :null}

    </div>
    
        
  );

}
