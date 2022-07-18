import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const Landing = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div>
      <nav class="navbar bg-light">
        <div class="container-fluid d-flex justify-content-between">
          <a class="navbar-brand" href="#">
            FaltaUno!
          </a>
          <div>
            <Link className="mr-2" onClick={() => loginWithRedirect()}>
              Ingresar
            </Link>
            <Link className="btn btn-success ml-2" to="/register">
              Registrarse
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Landing;
