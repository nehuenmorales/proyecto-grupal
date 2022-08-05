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
                            <th>Cancha</th>
                            <th>Día</th>
                            <th>Inicio</th>
                            <th>Final</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookedGames?.map((elem) => {
                            return (
                                <tr>
                                    <td>{elem.field.name}</td>
                                    <td>{elem.date}</td>
                                    <td>{elem.start}hs</td>
                                    <td>{elem.end}hs</td>
                                </tr>
                            )
                        })}

                    </tbody>
                </Table>
                : 'Aun no tienes reservas'}
        </div>
    )
}