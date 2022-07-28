import React from "react";
import CardGamesInc from "../CardGamesInc/CardGamesInc";
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux"
import { getGamesIncomplete } from "../../../../redux/GamesIncomplete/gamesIncompleteActions";
import s from "./CarouselGamesInc.css"
import VerticalNavbar from "../../../VerticalNavbar/VerticalNavbar";
import Tabs from "../../../Tabs/Tabs";
import Carousel from "../../../Carousel/Carousel";

export default function CarouselGamesInc({match}) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getGamesIncomplete());
    },[dispatch]);

    const games = useSelector(state => state.GamesIncompleteReducer.gamesIncomplete)

    return (
        <div>
        <VerticalNavbar/>
        <Tabs match={match}/>
        <Carousel key={1} array={games} type='games'/>
            {/* <div className={s.carousel}>
                {games?.map((x) => {
                    return (
                        <CardGamesInc
                            key={x.gameid}
                            name={x.name}
                            sport={x.sport}
                            freeplace={x.freeplace}
                            start={x.starthour}
                            end={x.endhour}
                            gameid={x.gameid}
                        />
                    );
                })}
            </div> */}
        </div>   
    );

};