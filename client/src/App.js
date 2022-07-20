import "./App.css";
import React from "react";
import { Route } from "react-router-dom";
//import Home from './Home.component';
import CarouselGamesInc from "./components/Games/GamesIncomplete/CarouselGamesInc";
import DetailGamesInc from "./components/Games/GamesIncomplete/DetailGamesInc"

function App() {
  return(
    <>
      <Route exact path="/gamesIncomplete" component={CarouselGamesInc} />
      <Route exact path="/gamesIncomplete/:gameid" component={DetailGamesInc} />
    </>
  ) 
}

export default App;
