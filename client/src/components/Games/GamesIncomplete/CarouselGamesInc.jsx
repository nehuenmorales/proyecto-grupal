import React from "react";
import CardGamesInc from "./CardGamesInc";
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux"
import { getGamesIncomplete } from "../../../redux/GamesIncomplete/gamesIncompleteActions";

export default function CarouselGamesInc() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getGamesIncomplete());
    },[dispatch]);

    const games = useSelector(state => state.GamesIncompleteReducer.gamesIncomplete)
    return (
        <div>
            <div>
                {console.log("id carrousel",games.id)}
                {console.log(games)}
                {games?.map((x) => {
                    return (
                        <CardGamesInc
                            key={x.id}
                            name={x.name}
                            sport={x.sport}
                            freeplace={x.freeplace}
                            start={x.start}
                            end={x.end}
                            gameid={x.gameid}
                        />
                    );
                })}
                
            </div>
        </div>   
    );

};