import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

export default function ComplexList(){
    const [complex, setComplex] = useState([])
    let owner = useSelector((state) => state.getOwnerReducer.owner)

    useEffect(()=> {
        axios.get(`https://falta-uno-1.herokuapp.com/owner/getComplexByOwner/${owner.id}`)
        .then(res => setComplex(res.data))
    })

    return (
        <div>
            <p>holis</p>
            {complex?.map((e) => {
                return (
                    <div key={e.id} >
                        <img src={e.image} alt="" />
                        <p>{e.name}</p>
                        <p>{e.address}</p>
                    </div>
                )
            })}
        </div>
    )
}