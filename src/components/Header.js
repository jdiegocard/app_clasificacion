import React from 'react';
import { Link } from 'react-router-dom';
import logo1 from '../assets/armonizado.png';
import '../styles/Header.css';

// Componente
const Header = () => {
  return (
    <header>
      <img className='header-image' src={logo1} alt="logo" />
      <div className="header-content">
      <h1>Bienvenido a clasificación</h1>
      </div>
      <nav>
        <a href="/">Inicio</a> | 
        <Link to="/productos">Productos</Link> |
        <Link to="/acerca">Acerca de</Link>
      </nav>
    </header>
  );
};

export default Header;