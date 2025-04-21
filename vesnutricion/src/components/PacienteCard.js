// src/components/PacienteCard.js
import React from "react";
import { Card, Button } from "react-bootstrap";

const PacienteCard = ({ paciente, onVerDetalle }) => {
  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title>{paciente.fullName}</Card.Title>
        <Card.Text>
          <strong>DNI:</strong> {paciente.dni} <br />
          <strong>Teléfono:</strong> {paciente.phone} <br />
          <strong>Celular:</strong> {paciente.mobile}
        </Card.Text>
        <Button variant="primary" onClick={onVerDetalle}>
          Ver Detalles
        </Button>
      </Card.Body>
    </Card>
  );
};

export default PacienteCard;
