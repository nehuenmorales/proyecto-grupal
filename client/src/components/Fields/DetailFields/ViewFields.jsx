// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {getAllFields} from '../../../redux/DetailField/DetailField-action';

// export default function DetailGamesInc({match}) {
//     const id = match.params.id;
//     const sport = match.params.sport;

//     const dispatch = useDispatch();
//     const detail = useSelector(state => state.getFieldsR.fields);
//   useEffect(()=>{
//       dispatch(getAllFields(id,sport))
//     },[dispatch,id,sport])

//     return (
//     <div >
//         <h2>{detail[0]?.name}</h2>
//         <h2>{detail[0]?.description}</h2>
//         <h2>{detail[0]?.start}</h2>
//         <h2>{detail[0]?.end}</h2>
//         <h2>{detail[0]?.pricePerTurn}</h2>
//         <h2>{detail[0]?.adress}</h2>
//         <h2>{detail[0]?.image}</h2>
//     </div>)
// }