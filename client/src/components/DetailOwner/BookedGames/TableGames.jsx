import React from 'react';
import Table from 'react-bootstrap/Table';

export default function TableGames({ bookedGames}) {
    return (
        <div style={{width: '70%'}}>
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