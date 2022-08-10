import { Box, Flex, SimpleGrid } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllFields } from '../../../redux/DetailField/DetailField-action';
import SearchBar from "../../SearchBar/SearchBar";
import Tabs from "../../Tabs/Tabs";
import VerticalNavbar from "../../VerticalNavbar/VerticalNavbar";
import FieldCard from "./FieldCard";



export default function DetailFields({ match }) {
    const dispatch = useDispatch();
    const field = useSelector((state) => state.getFieldsR.fields)
    const searchField = useSelector((state) => state.getFieldsR.fieldsSearch)
    const sport = match.params.sport;
    useEffect(() => {
        dispatch(getAllFields(sport))
    }, [dispatch, sport])


    return (
        <Flex>
            <VerticalNavbar />
            <Flex flexDir="column" mt="40px">
                <SearchBar sport={sport} filtro="canchas" />
                <Tabs match={match} />
                <SimpleGrid columns={3} spacing={12} ml="100px">
                    {searchField.length ?
                        searchField.map((e) => {
                            return (
                                <Box style={{ width:'300px', minWidth:'300px', maxWidth:'300px', height:'340px', minHeight:'340px', maxHeight:'340px'}}>
                                    <FieldCard
                                        key={e.id}
                                        name={e.name.charAt(0).toUpperCase() + e.name.slice(1)}
                                        sport={e.sport}
                                        description={e.description}
                                        capacity={e.capacity}
                                        image={e.image}
                                        complexId={e.complexId.charAt(0).toUpperCase() + e.complexId.slice(1)}
                                        durationPerTurn={e.durationPerTurn}
                                    />
                                </Box>
                            )
                        })
                        :
                        field?.map((e) => {
                            return (
                                <div style={{width:'300px', minWidth:'300px', maxWidth:'300px', height:'340px', minHeight:'340px', maxHeight:'340px'}}>
                                    <FieldCard
                                        id={e.id}
                                        key={e.id}
                                        name={e.name.charAt(0).toUpperCase() + e.name.slice(1)}
                                        sport={e.sport}
                                        description={e.description}
                                        capacity={e.capacity}
                                        image={e.image}
                                        complexId={e.complexId.charAt(0).toUpperCase() + e.complexId.slice(1)}
                                        pricePerTurn={e.pricePerTurn}
                                        durationPerTurn={e.durationPerTurn}

                                    />
                                </div>
                            )
                        })
                    }
                </SimpleGrid>
            </Flex>
        </Flex>
    )
}