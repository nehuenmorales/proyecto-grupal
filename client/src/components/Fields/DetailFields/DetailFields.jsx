import { Box, Flex, SimpleGrid } from "@chakra-ui/react";
import React, { useEffect } from "react";
//import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import {getAllFields} from '../../../redux/DetailField/DetailField-action';
import SearchBar from "../../SearchBar/SearchBar";
import Tabs from "../../Tabs/Tabs";
import VerticalNavbar from "../../VerticalNavbar/VerticalNavbar";
import FieldCard from "./FieldCard";
import s from "./FieldCard.module.css"



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
        <Flex>
        <VerticalNavbar/>
        <Flex flexDir="column" mt="40px">
        <SearchBar sport={sport} filtro="canchas" />
        <Tabs match={match}/>
            
        <SimpleGrid columns={3} spacing={12} ml="100px">
            {
                searchField.length?
                searchField.map((e) => {
                    return (
                        <Box>
                        <FieldCard 
                        key={e.id}
                        name={e.name}
                        sport={e.sport}
                        description={e.description}
                        capacity={e.capacity}
                        image={e.image}
                        />
                        </Box>
                    )
                })
                :
                field?.map((e) => {
                    return (
                        <Box>
                        <FieldCard 
                        id={e.id}
                        key={e.id}
                        name={e.name}
                        sport={e.sport}
                        description={e.description}
                        capacity={e.capacity}
                        image={e.image}
                        />
                        </Box>
                    )
                })
            }
            </SimpleGrid>
            </Flex>
        </Flex>
     )
}