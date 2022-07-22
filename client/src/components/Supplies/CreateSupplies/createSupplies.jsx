import { useState } from "react";
import SuppliesBasquet from "./Basquet/suppliesBasquet";
import SuppliesFutbol from "./Futbol/suppliesFutbol";
import SuppliesPadel from "./Padel/suppliesPadel";
import SuppliesTenis from "./Tenis/suppliesTenis";
import Button from 'react-bootstrap/Button';
import  c from './createSupplies.module.css'


export default function CreateSupplies() {
    const [sport, setSport] = useState({
      type:""
    });
    
    const selectSport=(e)=>{
      setSport({
        type:e.target.value,
      });
    }
  
    return (
      <div className={c.background}>
        <h3 className={c.letter}>Selecciona el deporte del producto a crear</h3>
        <span className={c.span}>
          <Button className={c.buttons} variant="success" size="lg" value={"futbol"} onClick={(e)=>selectSport(e)}>Futbol</Button>
          <Button className={c.buttons} variant="success" size="lg" value={"tenis"} onClick={(e)=>selectSport(e)}>Tenis</Button>
          <Button className={c.buttons} variant="success" size="lg" value={"padel"} onClick={(e)=>selectSport(e)}>Padel</Button>
          <Button className={c.buttons} variant="success" size="lg" value={"basquet"} onClick={(e)=>selectSport(e)}>Basquet</Button>
          
  
        </span>
        {sport.type==="futbol"?<SuppliesFutbol/> :null}
        {sport.type==="tenis"?<SuppliesTenis/> :null}
        {sport.type==="padel"?<SuppliesPadel/> : null}
        {sport.type==="basquet"?<SuppliesBasquet/> :null}
  
      </div>
      
          
    );
  
  }