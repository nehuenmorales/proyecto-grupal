import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getComplex } from '../../redux/Complexes/ComplexAction';
import CardComplex from './cardComplex';
import { useEffect } from 'react';
import VerticalNavbar from '../VerticalNavbar/VerticalNavbar';
import Tabs from '../Tabs/Tabs';
import SearchBar from '../SearchBar/SearchBar.jsx'

const GetComplex = ({match}) => {
    const dispatch = useDispatch()
    const sport = match.params.sport;
    const complex = useSelector(state => state.complexReducer.complex)
    const searchComplex = useSelector(state => state.complexReducer.searchComplex)

    useEffect(() => {
        dispatch(getComplex());
    }, [dispatch]);
    console.log(complex)
  return (
    <div>
        <VerticalNavbar/>
        <SearchBar filtro="complejos" sport={sport} />

        <Tabs match={match} />


                {
                searchComplex?
                searchComplex.map((x) => {
                    return (
                        <CardComplex
                            key={x.id}
                            name={x.name}
                            image={x.image}
                            description={x.description}
                            rating={x.rating}
                            adress={x.adress}
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
                            adress={x.adress}
                        />
                    );
                })
                }
                
    </div>
   
  )
}

export default GetComplex