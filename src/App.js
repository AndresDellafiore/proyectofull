import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Clientes from './components/Clientes';
import Vehiculos from './components/Vehiculos';
import Cuentas from './components/Cuentas';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Rutas protegidas */}
        <Route path="/clientes" element={
          <PrivateRoute>
            <Clientes />
          </PrivateRoute>
        } />
        <Route path="/vehiculos" element={
          <PrivateRoute>
            <Vehiculos />
          </PrivateRoute>
        } />
        <Route path="/cuentas" element={
          <PrivateRoute>
            <Cuentas />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
};

export default App;
