import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/global.css'; // si quieres agregar estilos opcionales

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5263/api/Auth/login', {
        email,
        password
      });

      const user = response.data;
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/pacientes');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ minWidth: '350px', maxWidth: '400px' }}>
        <h3 className="text-center mb-3">Iniciar sesión</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required />
          </div>
          <button type="submit" className="btn btn-primary w-100">Ingresar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
