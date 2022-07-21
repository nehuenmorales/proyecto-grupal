import "./scss/custom.css";
import React from "react";
import { Redirect, Route } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import { useAuth0 } from "@auth0/auth0-react";
import Home from "./pages/Home/Home";
import Register from "./components/Register/Register";

function App() {
  const { isAuthenticated, isLoading } = useAuth0();
  
  return (
    <>
    {
      isAuthenticated 
      ? <Route exact path="/" component={Home} /> 
      : <Route exact path="/landing" component={Landing} />
    }
      <Route exact path="/register" component={Register} />
    </>
  );

}

export default App;
