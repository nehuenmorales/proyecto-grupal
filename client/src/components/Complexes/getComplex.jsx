import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getComplex } from '../../redux/Complexes/ComplexAction';
import CardComplex from './cardComplex';
import { useEffect } from 'react';
import VerticalNavbar from '../VerticalNavbar/VerticalNavbar';
import Tabs from '../Tabs/Tabs';
import SearchBar from '../SearchBar/SearchBar.jsx'
import { Container, Row } from 'react-bootstrap';

const GetComplex = ({ match }) => {
	const dispatch = useDispatch()
	const sport = match.params.sport;
	const complex = useSelector(state => state.complexReducer.complex)
	const searchComplex = useSelector(state => state.complexReducer.complexSearch)

	useEffect(() => {
		dispatch(getComplex());
	}, [dispatch]);

	return (
		<div>
			<VerticalNavbar />
			<SearchBar filtro="complejos" sport={sport} />
			<Tabs match={match} />
			<Container>
				<Row
					style={{
						'display': 'flex',
						'alignItems': 'flex-start',
						'justifyContent': 'space-around'
					}}>
					{
						searchComplex.length ?
							searchComplex.map((x) => {
								return (
									<CardComplex
										key={x.id}
										name={x.name}
										image={x.image}
										description={x.description}
										rating={x.rating}
										adress={x.city}
									/>
								);
							})
							:
							complex?.map((x) => {
								return (
									<CardComplex
										key={x.id}
										name={x.name}
										image={x.image}
										description={x.description}
										rating={x.rating}
										adress={x.city}
									/>
								);
							})
					}
				</Row>
			</Container>

		</div>

	)
}

export default GetComplex