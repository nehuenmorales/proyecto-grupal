import { Link } from 'react-router-dom'
import s from './CreateFields.module.css'
import Button from "react-bootstrap/esm/Button";


export default function CreateFields() {

  return (
    <div className={s.container}>
       <div style = {{'padding': '10px'}}>
        <Link to='/'>
          <Button>Volver</Button>
        </Link>
      </div>
      <h3 className={s.titulo}><i>Selecciona el deporte</i> </h3>
      <div className={s.containercards}>
        <Link to='/owner/createField/futbol' style={{textDecoration:"none"}}>
         <div className={s.cards} id={s.futbol}>
          <h3 className={s.deporte}>
            FUTBOL
          </h3>
         </div>
        </Link>
        <Link to='/owner/createField/tenis' style={{textDecoration:"none"}}>
        <div className={s.cards} id={s.tenis}>
          <h3 className={s.deporte}>
            TENIS
          </h3>
         </div>
        </Link>
        <Link to='/owner/createField/padel' style={{textDecoration:"none"}}>
        <div className={s.cards} id={s.padel}>
          <h3 className={s.deporte}>
            PADEL
          </h3>
         </div>
        </Link>
        <Link to='/owner/createField/basquet' style={{textDecoration:"none"}}>
        <div className={s.cards} id={s.basquet}>
          <h3 className={s.deporte}>
            BASQUET
          </h3>
         </div>
        </Link>
      </div>
    </div>


  );

}
