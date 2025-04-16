// src/App.js
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Navbar from './components/Navbar';
import TurnosList from './components/TurnosList'; // Página para pacientes
import AdminPage from './pages/AdminPage'; // Asegurate que este archivo exista
import CalendarioTurnos from './components/CalendarioTurnos';
import './styles/global.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, []);

  const handleLogin = () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />

      <Routes>
        {/* Rutas según tipo de usuario */}
        {user.isAdmin ? (
          <>
            <Route path="/" element={<Navigate to="/admin" />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/calendario-turnos" element={<CalendarioTurnos />} />
            {/* Agregá aquí otras páginas admin */}
          </>
        ) : (
          <>
            <Route path="/" element={<Navigate to="/turnos" />} />
            <Route path="/turnos" element={<TurnosList />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
