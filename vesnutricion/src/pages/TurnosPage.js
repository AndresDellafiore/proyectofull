// src/pages/TurnosPage.js
// src/pages/TurnosPage.js
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import NuevoTurnoModal from "../components/NuevoTurnoModal";
import CalendarioTurnos from "../components/CalendarioTurnos";

const TurnosPage = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="container-fluid p-4" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-success">Gestión de Turnos</h2>
        <Button variant="success" onClick={handleOpenModal}>
          Solicitar Turno
        </Button>
      </div>
      <NuevoTurnoModal show={showModal} handleClose={handleCloseModal} />
      <CalendarioTurnos />
    </div>
  );
};

export default TurnosPage;
