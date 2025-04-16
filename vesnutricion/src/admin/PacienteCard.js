// admin/components/PacienteCard.js
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/global.css';

function PacienteCard({ paciente, onClick }) {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{paciente.fullName}</Card.Title>
        <Card.Text>Role: {paciente.role}</Card.Text>
        <Button variant="info" onClick={onClick}>
          Ver más
        </Button>
      </Card.Body>
    </Card>
  );
}

export default PacienteCard;
