import s from "./cardSupplie.module.css"

export default function CardSupplie({ newSupplie }) {
    // name:"", 
    //             sport:"futbol", 
    //             stock:"", 
    //             price:"",
    //             image:""
    return (
        <div className={s.cardcontainer}>
            {newSupplie.image ? <img className={s.image} src={newSupplie.image}></img> : <img className={s.image} src="https://api.iconify.design/material-symbols:hide-image-outline.svg" alt=''></img>}
            <div className={s.information}>


                {newSupplie.name ? <h5 className={s.title} >{newSupplie.name}</h5> : <h5 className={s.title} >NOMBRE</h5>}
                <div className={s.categorias}>
                    <h6 className={s.supplies}>Precio de renta: </h6>
                    <h6 className={s.supplies}>${newSupplie.price}</h6>
                </div>
                <div className={s.categorias}>
                    <h6 className={s.supplies}>Stock: </h6>
                    {newSupplie.stock?<h6 className={s.supplies}>    ¡{newSupplie.stock} disponibles!</h6>:<h6 className={s.supplies}>    ¡ -- disponibles!</h6>}
                </div>
            </div>

        </div>
    )
}