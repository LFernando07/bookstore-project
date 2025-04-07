import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import SignInForm from "../coomponents/auth/Login";
import SignUpForm from "../coomponents/Auth/register";
import "../styles/auth.css";

export const Auth = () => {
  const location = useLocation();
  const [type, setType] = useState("signIn");

  // Cambia el estado inicial dependiendo de la ruta
  useEffect(() => {
    if (location.pathname === "/register") {
      setType("signUp");
    } else if (location.pathname === "/login") {
      setType("signIn");
    }
  }, [location.pathname]);

  const handleOnClick = (text) => {
    if (text !== type) {
      setType(text);
    }
  };

  const containerClass =
    "container " + (type === "signUp" ? "right-panel-active" : "");

  return (
    <div className="App">
      <div className={containerClass} id="container">
        <SignInForm />
        <SignUpForm />
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Bienvenido de nuevo!</h1>
              <p>
                Mantente en sintonía, inicia sesión con tu cuenta Bookstore.
              </p>
              <button
                className="ghost"
                id="signIn"
                onClick={() => handleOnClick("signIn")}
              >
                Iniciar Sesión
              </button>
            </div>

            <div className="overlay-panel overlay-right">
              <h1>Hola, amigo!</h1>
              <p>Ingresa tus datos personales y comienza tu viaje con nosotros</p>
              <button
                className="ghost"
                id="signUp"
                onClick={() => handleOnClick("signUp")}
              >
                Crear Cuenta
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}