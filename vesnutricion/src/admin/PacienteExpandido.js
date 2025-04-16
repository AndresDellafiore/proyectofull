// admin/components/PacienteExpandido.js
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Card, Button, Form } from 'react-bootstrap';
import ModalEditPaciente from './ModalEditPaciente';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/global.css';

function PacienteExpandido({ paciente, onClose }) {
  const [showModal, setShowModal] = useState(false);

  const handleEditClick = () => {
    setShowModal(true);
  };

  return (
    <div className="expanded-card">
      <Card className="mt-4">
        <Card.Body>
          <Card.Title>{paciente.fullName}</Card.Title>
          <Card.Text>
            <strong>Nombre:</strong> {paciente.firstName} <br />
            <strong>Apellido:</strong> {paciente.lastName} <br />
            <strong>DNI:</strong> {paciente.dni} <br />
            <strong>Dirección:</strong> {paciente.address} <br />
            <strong>Obra Social/Prepaga:</strong> {paciente.obraSocial} <br />
            <strong>Fecha de Nacimiento:</strong> {new Date(paciente.birthDate).toLocaleDateString()} <br />
            <strong>Edad:</strong> {paciente.age} <br />
            <strong>Teléfono Fijo:</strong> {paciente.phoneFixed} <br />
            <strong>Teléfono Celular:</strong> {paciente.phoneCell} <br />
            <strong>Comentarios:</strong> {paciente.comments} <br />
          </Card.Text>

          <Button variant="secondary" onClick={onClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleEditClick}>
            Editar
          </Button>
        </Card.Body>
      </Card>

      <ModalEditPaciente
        show={showModal}
        paciente={paciente}
        onHide={() => setShowModal(false)}
      />
    </div>
  );
}

export default PacienteExpandido;
