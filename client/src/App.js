import "./App.css";
import React from "react";
import { Route } from "react-router-dom";
import CreateFields from "./components/Fields/CreateFields/CreateFields";
import fieldFutbol from "./components/Fields/CreateFields/Futbol/fieldFutbol.jsx"
import fieldBasquet from "./components/Fields/CreateFields/Basquet/fieldBasquet.jsx"
import fieldPadel from "./components/Fields/CreateFields/Padel/fieldPadel.jsx"
import fieldTenis from "./components/Fields/CreateFields/Tenis/fieldTenis.jsx"
import CreateSupplies from "./components/Supplies/CreateSupplies/createSupplies";
import SuppliesFutbol from "./components/Supplies/CreateSupplies/Futbol/suppliesFutbol";
import SuppliesBasquet from "./components/Supplies/CreateSupplies/Basquet/suppliesBasquet";
import SuppliesPadel from "./components/Supplies/CreateSupplies/Padel/suppliesPadel";
import SuppliesTenis from "./components/Supplies/CreateSupplies/Tenis/suppliesTenis";
//import Home from './Home.component';

function App() {
  return(
    <>
      <Route exact path={"/owner/select"} component={CreateFields} />
      <Route exact path={"/owner/createField/futbol"} component={fieldFutbol} />
      <Route exact path={"/owner/createField/basquet"} component={fieldBasquet} />
      <Route exact path={"/owner/createField/padel"} component={fieldPadel} />
      <Route exact path={"/owner/createField/tenis"} component={fieldTenis} />
      <Route exact path={"/owner/createField"} component={CreateFields} />


      <Route exact path={"/owner/createSupplie"} component={CreateSupplies}/>
      <Route exact path={"/owner/createSupplie/futbol"} component={SuppliesFutbol}/>
      <Route exact path={"/owner/createSupplie/tenis"} component={SuppliesTenis}/>
      <Route exact path={"/owner/createSupplie/padel"} component={SuppliesPadel}/>
      <Route exact path={"/owner/createSupplie/basquet"} component={SuppliesBasquet}/>


    </>
  ) 
}

export default App;
