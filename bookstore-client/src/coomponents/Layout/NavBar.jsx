import { Link } from "react-router";
import "../../styles/navbar.css";

export const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">📚 Bookstore</Link>
        <input type="checkbox" id="menu-toggle" className="menu-toggle" />
        <label htmlFor="menu-toggle" className="menu-icon">
          <span></span>
          <span></span>
          <span></span>
        </label>
        <ul className="navbar-menu">
          <li><Link to="/cart">Carrito</Link></li>
          <li><Link to="/books">Libros</Link></li>
          <li><Link to="/login">Iniciar Sesión</Link></li>
          <li><Link to="/register">Registrarse</Link></li>
          <li><Link to="/profile">Perfil</Link></li>
        </ul>
      </div>
    </nav>
  );
};