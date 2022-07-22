import "./scss/custom.css";
import React from "react";
import { Redirect, Route } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import { useAuth0 } from "@auth0/auth0-react";
import Home from "./pages/Home/Home";
import Register from "./components/Register/Register";
import { Spinner } from "react-bootstrap";

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

      {/* <Route exact path="/register" component={Register} /> */}
    </>
  );

}

export default App;
