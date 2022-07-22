import React from "react";
import playersImage from "../../assets/images/playersLandingPage.png";
import "./Register.css";

const Register = () => {
  return (
    <>
      <section class="register-container">
        <section class="image-container">
          <h3>FaltaUno!</h3>
          <img width="500" src={playersImage} />
        </section>
        <form class="form-container">
          <h3>Registrarse</h3>
          <div class="form-group">
            <label for="firstName" >Nombre </label>
            <input class="input" type="text" id="firstName" placeholder="Juan Pablo" />
          </div>

          <div class="form-group">
            <label for="lastName">Apellido</label>
            <input class="input" type="text" id="lastName" placeholder="Perez" />
          </div>

          <div class="form-group">
            <label for="phone">Teléfono</label>
            <input class="input" type="tel" id="phone" placeholder="351***" />
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input class="input" type="text" id="email" placeholder="name@domain.com" />
          </div>
          <div class="form-group">
            <label for="username">Usuario</label>
            <input class="input" type="text" id="username" placeholder="juanperez" />
          </div>
          <div class="form-group checkbox-group">
            <input type="checkbox" id="cbx" style={{ "display": "none" }} />
            <label htmlFor="cbx" class="check">
              <svg width="18px" height="18px" viewBox="0 0 18 18">
                <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                <polyline points="1 9 7 14 15 4"></polyline>
              </svg>
            </label>
            <label htmlFor="cbx"> Acepto los Términos y Condiciones</label>
          </div>
          <button class="button">Registrarse</button>
        </form>
      </section>
    </>
  );
};

export default Register;
