import  s from './createSupplies.module.css';
import { Link } from 'react-router-dom'



export default function CreateSupplies() {
    return (
      <div className={s.container}>
        <h3 className={s.titulo}>Selecciona el deporte del producto a crear</h3>
        <div className={s.containercards}>
        <Link to='/owner/createSupplie/futbol' style={{textDecoration:"none"}}>
         <div className={s.cards} id={s.futbol}>
          <h3 className={s.deporte}>
            FUTBOL
          </h3>
         </div>
        </Link>
        <Link to='/owner/createSupplie/tenis' style={{textDecoration:"none"}}>
         <div className={s.cards} id={s.tenis}>
          <h3 className={s.deporte}>
            TENIS
          </h3>
         </div>
        </Link>
        <Link to='/owner/createSupplie/padel' style={{textDecoration:"none"}}>
         <div className={s.cards} id={s.padel}>
          <h3 className={s.deporte}>
            PADEL
          </h3>
         </div>
        </Link>     
        <Link to='/owner/createSupplie/basquet' style={{textDecoration:"none"}}>
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