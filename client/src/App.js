import "./App.css";
import React from "react";
import { Route } from "react-router-dom";
import CreateFields from "./components/Fields/CreateFields/CreateFields";
import CreateSupplies from "./components/Supplies/CreateSupplies/createSupplies";
//import Home from './Home.component';

function App() {
  return(
    <>
      <Route exact path={"/owner/createField"} component={CreateFields} />


      <Route exact path={"/owner/createSupplie"} component={CreateSupplies}/>
    </>
  ) 
}

export default App;
