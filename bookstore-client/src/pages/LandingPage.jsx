import React from "react";
import "../styles/landingPage.css";
import { Footer } from "../coomponents/Layout/Footer.jsx";

export default function LandingPage() {
  return (
    <>
      <div className="landing-page">
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">Descubre tu próxima gran aventura</h1>
            <p className="hero-subtitle">
              Explora nuestra colección de libros cuidadosamente seleccionados para lectores apasionados como tú.
            </p>
            <div className="hero-buttons">
              <a href="/login" className="btn btn-primary">Comenzar</a>
              <a href="#contact" className="btn btn-secondary">Contáctanos</a>
            </div>
          </div>
          <div className="hero-image">
            {/* <img alt="Ilustración de libros pendiente" /> */}
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}