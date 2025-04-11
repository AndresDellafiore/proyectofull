// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // si querés estilos

const Navbar = () => {
  return (
    <nav className="navbar">
      <h3>Avellaneda Parking</h3>
      <ul>
        <li><Link to="/dashboard">Inicio</Link></li>
        <li><Link to="/clientes">Clientes</Link></li>
        <li><Link to="/cuentas">Cuentas</Link></li>
        <li><Link to="/vehiculos">Vehículos</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
