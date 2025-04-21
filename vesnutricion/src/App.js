// src/App.js
// frontend/src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import PacientesPage from "./pages/PacientesPage";
import PrivateRoute from "./components/PrivateRoute";
import TurnosPage from "./pages/TurnosPage";
// import TurnoDetallePage from "./pages/TurnoDetallePage";
import TurnoDetallePage from './components/TurnoDetallePage';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Container className="my-4">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<LoginPage />} />
          
          <Route path="/pacientes" element={<PrivateRoute><PacientesPage /></PrivateRoute>} />
          <Route path="/turnos" element={<PrivateRoute><TurnosPage /></PrivateRoute>} />
          <Route path="/turnos/detalle/:id" element={<PrivateRoute><TurnoDetallePage /></PrivateRoute>} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;