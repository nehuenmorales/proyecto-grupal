import React from "react";
import CardGamesInc from "./CardGamesInc";
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux"
import { getGamesIncomplete } from "../../../redux/GamesIncomplete/gamesIncompleteActions";
import s from "./CarouselGamesInc.css"
import VerticalNavbar from "../../VerticalNavbar/VerticalNavbar";
import Tabs from "../../Tabs/Tabs";
import SearchBar from "../../SearchBar/SearchBar";

export default function CarouselGamesInc({match}) {
    const dispatch = useDispatch();
    const sport = match.params.sport;

    useEffect(() => {
        dispatch(getGamesIncomplete());
    },[dispatch]);

    const games = useSelector(state => state.GamesIncompleteReducer.gamesIncomplete)
    const searchGames = useSelector(state => state.GamesIncompleteReducer.searchGamesIncomplete)

    console.log(games)
    return (
        <div>
        <VerticalNavbar/>
        <SearchBar filtro="gamesIncomplit" sport={sport} />
        <Tabs match={match}/>
            <div className={s.carousel}>
                {
                searchGames?
                searchGames.map((x) => {
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
                })
                :    
                games?.map((x) => {
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
                
            </div>
        </div>   
    );

};