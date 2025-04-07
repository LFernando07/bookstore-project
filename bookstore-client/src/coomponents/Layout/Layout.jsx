import React from "react";
import { NavBar } from '../../coomponents/Layout/NavBar.jsx';
import "../../styles/layout.css";

export const Layout = ({ children }) => {
  return (
    <div className="layout">
      <header className="layout-header">
        <NavBar /> {/* Incluye el componente NavBar */}
      </header>
      <main className="layout-content">
        {children} {/* Aquí se renderizan los componentes dinámicos */}
      </main>
      <footer className="layout-footer">
        <p>© 2025 Bookstore. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}