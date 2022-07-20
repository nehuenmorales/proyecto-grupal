import "./App.css";
import React from "react";
import { Route } from "react-router-dom";
import DetailFields from "./components/Fields/DetailFields/DetailFields.jsx";

function App() {
  return(
    <>
        <Route path="/fields" component={DetailFields} />
    </>
  ) 
}

export default App;
