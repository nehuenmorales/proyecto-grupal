import "./scss/custom.css";
import React from "react";
import Landing from "./components/Landing/Landing";
import { useAuth0, User } from "@auth0/auth0-react";
import Home from "./pages/Home/Home";
import { Spinner } from "react-bootstrap";
import { Route } from "react-router-dom";
import CreateFields from "./components/Fields/CreateFields/CreateFields";
import fieldFutbol from "./components/Fields/CreateFields/Futbol/fieldFutbol.jsx";
import fieldBasquet from "./components/Fields/CreateFields/Basquet/fieldBasquet.jsx";
import fieldPadel from "./components/Fields/CreateFields/Padel/fieldPadel.jsx";
import fieldTenis from "./components/Fields/CreateFields/Tenis/fieldTenis.jsx";
import CreateSupplies from "./components/Supplies/CreateSupplies/createSupplies";
import SuppliesFutbol from "./components/Supplies/CreateSupplies/Futbol/suppliesFutbol";
import SuppliesBasquet from "./components/Supplies/CreateSupplies/Basquet/suppliesBasquet";
import SuppliesPadel from "./components/Supplies/CreateSupplies/Padel/suppliesPadel";
import SuppliesTenis from "./components/Supplies/CreateSupplies/Tenis/suppliesTenis";
import CarouselGamesInc from "./components/Games/GamesIncomplete/CarouselGamesInc";
import DetailGamesInc from "./components/Games/GamesIncomplete/DetailGamesInc";
import DetailFields from "./components/Fields/DetailFields/DetailFields.jsx";
import AllGames from "./components/AllGames/AllGames.jsx"
import GetComplex from "./components/Complexes/getComplex"
import HomeOwner from "./pages/HomeOwner/HomeOwner";
import CreateComplex from "./components/Complex/CreateComplex/CreateComplex";
import ComplexList from "./components/DetailOwner/Complexes/ComplexList";
import FieldList from "./components/DetailOwner/Fields/FieldList";
import SuppliesList from "./components/DetailOwner/Supplies/SuppliesList";
import ComplexDetail from "./components/DetailOwner/Complexes/complexDetail";
import FieldById from "./components/Fields/DetailFields/FieldById.jsx"
import GameDetail from "./components/Games/GameDetail/gameDetail.jsx"
import AllGames from "./components/AllGames/AllGames.jsx";
import ViewFields from "./components/Fields/DetailFields/ViewFields.jsx";
import GetPlayers from "./components/Players/getPlayers";
import PlayerProfile from "./components/Profile/Profile";

import { TeamsContainer } from "./components/Teams/TeamContainer";

function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  return (
    <>
      <Route exact path={"/owner/select"} component={CreateFields} />
      <Route exact path={"/owner/createField/futbol"} component={fieldFutbol} />
      <Route
        exact
        path={"/owner/createField/basquet"}
        component={fieldBasquet}
      />
      <Route exact path={"/owner/createField/padel"} component={fieldPadel} />
      <Route exact path={"/owner/createField/tenis"} component={fieldTenis} />
      <Route exact path={"/owner/createField"} component={CreateFields} />
      
      {  isLoading
          ?
          <Spinner animation="border" variant="light" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
      : isAuthenticated
      ? user['https://example.com/rol'] === 'owner' 
      ?
      <Route exact path="/" component={HomeOwner} /> 
      :
      <Route exact path="/" component={Home} />
      : 
      <Route exact path="/" component={Landing} />}
       {/* leo rompiste todo con esta ruta que esta abajito, AREGLALO */}
      <Route exact path="/sport/:sport" component={AllGames} /> 
      <Route exact path="/sport/:sport/gamesIncomplete" component={CarouselGamesInc} />
      <Route exact path="/sport/:sport/gamesIncomplete/:gameid" component={DetailGamesInc} />
      <Route exact path="/fields/detail/:id" component={FieldById} />
      {isLoading ? (
        <Spinner animation="border" variant="light" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : isAuthenticated ? (
        <Route exact path="/" component={Home} />
      ) : (
        <Route exact path="/" component={Landing} />
      )}
      {/* leo rompiste todo con esta ruta que esta abajito, AREGLALO */}
      <Route exact path="/sport/:sport" component={AllGames} />
      <Route
        exact
        path="/sport/:sport/gamesIncomplete"
        component={CarouselGamesInc}
      />
      <Route
        exact
        path="/sport/:sport/gamesIncomplete/:gameid"
        component={DetailGamesInc}
      />
      {/* <Route exact path="/fields" component={DetailFields} /> */}
      {/* <Route path="/allGames" component={AllGames} /> */}
      {/* <Route exact path="/allGames/:sport" render={({ match }) => <AllGames deporte={match.params.sport} match={match}/>} /> */}
      <Route exact path="/fields/:sport" component={DetailFields} />
      <Route exact path="/sport/:sport/players" component={GetPlayers} />
      <Route exact path="/sport/:sport/complex" component={GetComplex} />
      <Route exact path={"/owner/createSupplie"} component={CreateSupplies}/>
      <Route exact path={"/owner/createSupplie/futbol"} component={SuppliesFutbol}/>
      <Route exact path={"/owner/createSupplie/tenis"} component={SuppliesTenis}/>
      <Route exact path={"/owner/createSupplie/padel"} component={SuppliesPadel}/>
      <Route exact path={"/owner/createSupplie/basquet"} component={SuppliesBasquet}/>
      <Route exact path={"/games/detail/:id"} component={GameDetail}/>

      <Route exact path={"/owner/createComplex"} component={CreateComplex}/>
      <Route exact path={"/complexOwner"} component={ComplexList}/>
      <Route exact path={"/fieldOwner"} component={FieldList}/>
      <Route exact path={"/suppliesOwner"} component={SuppliesList}/>
      <Route exact path="/owner/complexDetail/:id" render={({ match }) => {return <ComplexDetail id={match.params.id} />;}}/>


      <Route exact path="/profile" component={PlayerProfile} />
      <Route exact path="/equipos" component={TeamsContainer} />

      <Route exact path={"/owner/createSupplie"} component={CreateSupplies} />
      <Route
        exact
        path={"/owner/createSupplie/futbol"}
        component={SuppliesFutbol}
      />
      <Route
        exact
        path={"/owner/createSupplie/tenis"}
        component={SuppliesTenis}
      />
      <Route
        exact
        path={"/owner/createSupplie/padel"}
        component={SuppliesPadel}
      />
      <Route
        exact
        path={"/owner/createSupplie/basquet"}
        component={SuppliesBasquet}
      />
    </>
  );
}

export default App;
