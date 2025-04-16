import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">VesNutricion</Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            {user && user.isAdmin ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/pacientes">Pacientes</Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-danger" onClick={handleLogout}>Cerrar sesión</button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button className="btn btn-danger" onClick={handleLogout}>Cerrar sesión</button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
