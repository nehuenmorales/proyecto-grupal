import "./scss/custom.css";
import React from "react";
import Landing from "./components/Landing/Landing";
import { useAuth0 } from "@auth0/auth0-react";
import Home from "./pages/Home/Home";
import { Spinner } from "react-bootstrap";
import { Route } from "react-router-dom";
import CarouselGamesInc from "./components/Games/GamesIncomplete/CarouselGamesInc";
import DetailGamesInc from "./components/Games/GamesIncomplete/DetailGamesInc"
import DetailFields from "./components/Fields/DetailFields/DetailFields.jsx";
import AllGames from "./components/AllGames/AllGames.jsx"
import ViewFields from './components/Fields/DetailFields/ViewFields.jsx';
import GetPlayers from "./components/Players/getPlayers";
import GetComplex from "./components/Complexes/getComplex"

function App() {

  const { isAuthenticated, isLoading } = useAuth0();

  return (
    <>
      {
        isLoading
          ?
          <Spinner animation="border" variant="light" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
      : isAuthenticated
      ? <Route exact path="/" component={Home} />
      : <Route exact path="/" component={Landing} />
    }
       {/* leo rompiste todo con esta ruta que esta abajito, AREGLALO */}
      <Route exact path="/:sport" component={AllGames} /> 
      <Route exact path="/gamesIncomplete" component={CarouselGamesInc} />
      <Route exact path="/gamesIncomplete/:gameid" component={DetailGamesInc} />
      <Route exact path="/fields" component={DetailFields} />
      {/* <Route path="/allGames" component={AllGames} /> */}
      {/* <Route exact path="/allGames/:sport" render={({ match }) => <AllGames deporte={match.params.sport} match={match}/>} /> */}
      <Route exact path="/fields/:sport" component={DetailFields} />
      <Route exact path="/fields/:sport/:id" component={ViewFields} />
      <Route exact path="/players" component={GetPlayers} />
      <Route exact path="/complex" component={GetComplex} />

    </>
  );

}

export default App;
