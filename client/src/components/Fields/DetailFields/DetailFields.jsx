import React, { useEffect } from "react";
//import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import {getAllFields} from '../../../redux/DetailField/DetailField-action';
import SearchBar from "../../SearchBar/SearchBar";
import Tabs from "../../Tabs/Tabs";
import VerticalNavbar from "../../VerticalNavbar/VerticalNavbar";
import FieldCard from "./FieldCard";


export default function DetailFields({match}) {
    const dispatch = useDispatch();
    const field = useSelector ((state) => state.getFieldsR.fields)

    const searchField = useSelector ((state) => state.getFieldsR.fieldsSearch)

    const sport = match.params.sport;
 console.log(sport, 'soy el parametro')
    useEffect(() => {
        dispatch(getAllFields(sport))
    }, [dispatch,sport])
   
   
    return (
        <div>
        <VerticalNavbar/>
        <SearchBar sport={sport} filtro="canchas" />
        <Tabs match={match}/>
            {
                searchField.length?
                searchField.map((e) => {
                    return (
                        <FieldCard 
                        key={e.id}
                        name={e.name}
                        sport={e.sport}
                        description={e.description}
                        capacity={e.capacity}
                        image={e.image}
                        />
                    )
                })
                :
                field?.map((e) => {
                    return (
                        <FieldCard 
                        key={e.id}
                        name={e.name}
                        sport={e.sport}
                        description={e.description}
                        capacity={e.capacity}
                        image={e.image}
                        />
                    )
                })
            }
        </div>
     )
}