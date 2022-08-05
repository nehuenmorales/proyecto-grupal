import React from 'react';
import Table from 'react-bootstrap/Table';

export default function TableGames({ bookedGames }) {
    return (
        // {bookedGames?.length > 0 ?
        //     bookedGames.map((elem) => {
        //         //  const res = field(elem);
        //         //  console.log(res, 'soy res')
        //         return (
        //             <div>
        //                 <h2>{`Reserva en cancha: ${elem.field.name}`}</h2>
        //                 <h4>Fecha: {elem.date}</h4>
        //                 <p>Horario de inicio: {elem.start}hs</p>
        //                 <p>Horario de finalización: {elem.end}hs</p>
        //             </div>
        //         )
        //     })
        //     : 'Aun no tienes reservas'}
        <div>
            {bookedGames?.length > 0 ?
                <Table striped>
                    <thead>
                        <tr>
                            <th style={{color:'white'}}>Cancha</th>
                            <th style={{color:'white'}}>Día</th>
                            <th style={{color:'white'}}>Inicio</th>
                            <th style={{color:'white'}}>Final</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookedGames?.map((elem) => {
                            return (
                                <tr>
                                    <td style={{color:'white'}}>{elem.field.name}</td>
                                    <td style={{color:'white'}}>{elem.date}</td>
                                    <td style={{color:'white'}}>{elem.start}hs</td>
                                    <td style={{color:'white'}}>{elem.end}hs</td>
                                </tr>
                            )
                        })}

                    </tbody>
                </Table>
                : 'Aun no tienes reservas'}
        </div>
    )
}