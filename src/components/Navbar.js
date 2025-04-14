// src/components/Navbar.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );
  const navigate = useNavigate();

  useEffect(() => {
    const handleLoginChange = () => {
      setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    };

    window.addEventListener('loginChanged', handleLoginChange);

    return () => {
      window.removeEventListener('loginChanged', handleLoginChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("loginChanged"));
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <h3>Avellaneda Parking</h3>
      <ul>
        {isLoggedIn ? (
          <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/clientes">Clientes</Link></li>
            <li><Link to="/cuentas">Cuentas</Link></li>
            <li><Link to="/vehiculos">Vehículos</Link></li>
            <li><button className="logout-button" onClick={handleLogout}>Cerrar sesión</button></li>
          </>
        ) : (
          <li><Link to="/login">Iniciar sesión</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
