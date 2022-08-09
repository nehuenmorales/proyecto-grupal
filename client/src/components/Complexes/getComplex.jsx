import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getComplex } from '../../redux/Complexes/ComplexAction';
import CardComplex from './cardComplex';
import { useEffect } from 'react';
import VerticalNavbar from '../VerticalNavbar/VerticalNavbar';
import Tabs from '../Tabs/Tabs';
import SearchBar from '../SearchBar/SearchBar.jsx'
import { Container, Row } from 'react-bootstrap';
import {Flex,SimpleGrid,Box} from "@chakra-ui/react"

const GetComplex = ({ match }) => {
	const dispatch = useDispatch()
	const sport = match.params.sport;
	const complex = useSelector(state => state.complexReducer.complex)
	const searchComplex = useSelector(state => state.complexReducer.complexSearch)

	useEffect(() => {
		dispatch(getComplex());
	}, [dispatch]);

	return (
		<Flex>
			<VerticalNavbar />
			<Flex flexDir="column" mt="40px">

			<SearchBar filtro="complejos" sport={sport} />
			<Tabs match={match} />
			<Container>
			<SimpleGrid columns={3} spacing={12} ml="100px">
					{
						searchComplex.length ?
							searchComplex.map((x) => {
								return (
									<Box>
									<CardComplex
										key={x.id}
										name={x.name}
										image={x.image}
										rating={x.rating}
										reviews={x.reviews}
										state={x.state}
										/>
									</Box>
									);
								})
								:
								complex?.map((x) => {
									return (
									<Box>
										<CardComplex
										key={x.id}
										name={x.name}
										image={x.image}
										rating={x.rating}
										reviews={x.reviews}
										state={x.state}
										/>
									</Box>
										);
									})
								}
				</SimpleGrid>
			</Container>
		</Flex>

		</Flex>

	)
}

export default GetComplex