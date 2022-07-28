import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getPlayers } from '../../redux/Players/GetPlayersAction';
import CardPlayers from './CardPlayer/CardPlayer';
import { useEffect } from 'react';
import VerticalNavbar from '../VerticalNavbar/VerticalNavbar';
import Tabs from '../Tabs/Tabs';
import { Col, Container, Row } from 'react-bootstrap';

const GetPlayers = ({ match }) => {
    const dispatch = useDispatch()
    const players = useSelector(state => state.getPlayersReducer.players)

    useEffect(() => {
        dispatch(getPlayers());
    }, [dispatch]);
    return (
        <div>
            <VerticalNavbar />
            <Tabs match={match} />
            <Container>
                <Row>
                    {players?.map((x) => {
                        return (
                            <Col>
                                <CardPlayers
                                    key={x.id}
                                    name={x.name}
                                    lastName={x.lastName}
                                    username={x.username}
                                    city={x.city}
                                    elo={x.elo}
                                />
                            </Col>
                        );
                    })}

                </Row>

            </Container>

        </div>

    )
}

export default GetPlayers