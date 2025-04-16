// src/components/Navbar.js
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/global.css';

function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    onLogout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">Inicio</NavLink>

        <div className="navbar-nav">
          {user?.isAdmin && (
            <>
              <NavLink to="/admin/PacientesPage" className="nav-link">Pacientes</NavLink>
              <NavLink to="/admin/historias" className="nav-link">Historias Clínicas</NavLink>
              <NavLink to="/admin/calendario-turnos" className="nav-link">Calendario</NavLink>
            </>
          )}
        </div>

        <div className="ms-auto">
          {user && (
            <button className="btn btn-outline-danger" onClick={handleLogout}>
              Cerrar sesión
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
