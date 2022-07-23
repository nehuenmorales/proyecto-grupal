import "./App.css";
import React from "react";
import { Route } from "react-router-dom";
import CreateFields from "./components/Fields/CreateFields/CreateFields";
import fieldFutbol from "./components/Fields/CreateFields/Futbol/fieldFutbol.jsx"
import fieldBasquet from "./components/Fields/CreateFields/Basquet/fieldBasquet.jsx"
import fieldPadel from "./components/Fields/CreateFields/Padel/fieldPadel.jsx"
import fieldTenis from "./components/Fields/CreateFields/Tenis/fieldTenis.jsx"
//import Home from './Home.component';

function App() {
  return(
    <>
      <Route exact path={"/owner/select"} component={CreateFields} />
      <Route exact path={"/owner/createField/futbol"} component={fieldFutbol} />
      <Route exact path={"/owner/createField/basquet"} component={fieldBasquet} />
      <Route exact path={"/owner/createField/padel"} component={fieldPadel} />
      <Route exact path={"/owner/createField/tenis"} component={fieldTenis} />
    </>
  ) 
}

export default App;
