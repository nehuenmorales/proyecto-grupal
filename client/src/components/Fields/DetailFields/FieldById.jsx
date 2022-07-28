import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFieldById } from "../../../redux/DetailField/DetailField-action";
import VerticalNavbar from "../../VerticalNavbar/VerticalNavbar";
import { useHistory } from 'react-router-dom';


export default function FieldById({match}) {
    const id = match.params.id;
    const dispatch = useDispatch();
    const detail = useSelector(state => state.getFieldsR.detailFields);
    const history = useHistory();

  useEffect(()=>{
      dispatch(getFieldById(id))
    },[dispatch,id])
    console.log(detail, "detalle")

    function HandleSelect(e){
        e.preventDefault(e)
        history.push(`/games/detail/${e.target.value}`)
        
    }

    return (
        <div >
        <VerticalNavbar/>
        <h2>{detail[0]?.name}</h2>
        <h2>{detail[0]?.sport}</h2>
        <h2>{detail[0]?.open}</h2>
        <h2>{detail[0]?.close}</h2>
        <h2>{detail[0]?.capacity}</h2>
        {      
                    <select onChange={(e)=>{HandleSelect(e)}}>
                    <option hidden>Turnos Disponibles</option>
                    {detail?.map((e) => {
                        return (
                            <option key={e.id} value={e.id}>{e.date}{e.start}{e.end}</option>
                        )
                    })}
                    </select>
        }
    </div>)
}
