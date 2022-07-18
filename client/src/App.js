import "./App.css";
import React from "react";
import { Route } from "react-router-dom";
import Landing from "./components/landing/landing";
//import Home from './Home.component';
import Register from "./components/regiter/register";

function App() {
  return (
    <>
      <Route exact path="/" component={Landing} />
      <Route exact path="/register" component={Register} />
    </>
  );
}

export default App;
