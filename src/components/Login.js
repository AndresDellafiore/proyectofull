import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5007/api/Client/Login", { email, password });
      if (response.status === 200) {
        // Redirigir al Dashboard
        navigate('/dashboard');
      }
    } catch (error) {
      console.error("Error al hacer login", error);
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Correo"
      />
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Contraseña"
      />
      <button onClick={handleLogin}>Ingresar</button>
    </div>
  );
};

export default Login;

