import React from "react";
import { Link } from "react-router-dom";
import "../styles.css";

const Header = () => {
  return (
    <header className="header">
      <h1>Melhora Crato</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Início</Link>
          </li>
          <li>
            <Link to="/register">Cadastre-se</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;