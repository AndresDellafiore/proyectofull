// src/components/DetalleTurnoModal.js
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/global.css';

function DetalleTurnoModal({ show, onHide, turno }) {
  if (!turno) return null;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Detalle del Turno</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Nombre del Paciente:</strong> {turno.patientName}</p>
        <p><strong>Fecha:</strong> {new Date(turno.date).toLocaleString()}</p>
        <p><strong>Motivo:</strong> {turno.reason}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DetalleTurnoModal;
