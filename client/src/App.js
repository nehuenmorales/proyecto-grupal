import "./App.css";
import React from "react";
import { Route } from "react-router-dom";
import CreateFields from "./components/Fields/CreateFields/createFields";
//import Home from './Home.component';

function App() {
  return(
    <>
      <Route exact path={"/owner/createField"} component={CreateFields} />

    </>
  ) 
}

export default App;
