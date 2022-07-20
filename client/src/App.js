import "./scss/custom.css";
import React from "react";
import { Route } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Register from "./components/Register/Register";
import { useAuth0 } from "@auth0/auth0-react";
import Home from "./pages/Home/Home";

function App() {
  const { isAuthenticated } = useAuth0();
  console.log(useAuth0());
  return (
    <>
      <Route exact path="/" component={Landing} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/register" component={Register} />
    </>
  );

}

export default App;
