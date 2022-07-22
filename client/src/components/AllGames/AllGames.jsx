// import React from "react";
// import { useEffect} from "react";
// import { useDispatch, useSelector } from "react-redux"
// import { getGameSport } from "../../redux/games/gamesAction";
// import gamesReducer from "../../redux/games/gamesReducer"

// export default function AllGames(){
//     const dispatch = useDispatch()
//     const allGames = useSelector(state=> state.gamesReducer.gamesSport)


//     return (
//         <h1>hola</h1>
//     )
// }

import React from "react";
import CardGames from "./cardGames.jsx";

import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux"
import { getGameSport } from "../../redux/games/gamesAction";
import gamesReducer from "../../redux/games/gamesReducer"

export default function AllGames({match}) {
    const sport =match.params.sport
    const dispatch = useDispatch();
    const games = useSelector(state => state.gamesReducer.gamesSport)

    useEffect(() => {
        dispatch(getGameSport(sport));
    },[dispatch,sport]);
    console.log("sport", sport)

    return (
        <div>
            {
                games?.map((e)=>{
                    return(
                      <CardGames 
                    key={e.id}
                    name={e.name}
                    start={e.start}
                    end={e.end}
                    date={e.date}
                    />  
                    )
                })
            }
        </div>   
    );

};
