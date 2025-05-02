import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './pages/Dashboard';
import Clientes from './pages/Clientes';
import Vehiculos from './pages/Vehiculos';
import Cuentas from './pages/Cuentas';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute'; // Asegúrate de importar PrivateRoute
import VehiculoDetalle from './components/VehiculoDetalle';  // Importa el componente de detalles del vehículo

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Rutas protegidas */}
        <Route 
          path="/clientes" 
          element={
            <PrivateRoute>
              <Clientes />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/vehiculos" 
          element={
            <PrivateRoute>
              <Vehiculos />
            </PrivateRoute>
          } 
        />
        {/* Ruta para ver los detalles de un vehículo */}
        <Route 
          path="/vehiculo/:vehicleId"  // Agrega un parámetro para el ID del vehículo
          element={
            <PrivateRoute>
              <VehiculoDetalle />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/cuentas" 
          element={
            <PrivateRoute>
              <Cuentas />
            </PrivateRoute>
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;
