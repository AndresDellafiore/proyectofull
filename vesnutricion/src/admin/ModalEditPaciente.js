// admin/components/ModalEditPaciente.js
import axios from 'axios';
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/global.css';

function ModalEditPaciente({ show, onHide, paciente }) {
  const [formData, setFormData] = useState({
    firstName: paciente.firstName,
    lastName: paciente.lastName,
    dni: paciente.dni,
    address: paciente.address,
    obraSocial: paciente.obraSocial,
    phoneFixed: paciente.phoneFixed,
    phoneCell: paciente.phoneCell,
    comments: paciente.comments,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    axios.put(`http://localhost:5263/api/Users/${paciente.id}`, formData)
      .then(() => {
        onHide();
      })
      .catch((err) => console.error(err));
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Paciente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formFirstName">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formLastName">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formDni">
            <Form.Label>DNI</Form.Label>
            <Form.Control
              type="text"
              name="dni"
              value={formData.dni}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formAddress">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formObraSocial">
            <Form.Label>Obra Social/Prepaga</Form.Label>
            <Form.Control
              type="text"
              name="obraSocial"
              value={formData.obraSocial}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formPhoneFixed">
            <Form.Label>Teléfono Fijo</Form.Label>
            <Form.Control
              type="text"
              name="phoneFixed"
              value={formData.phoneFixed}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formPhoneCell">
            <Form.Label>Teléfono Celular</Form.Label>
            <Form.Control
              type="text"
              name="phoneCell"
              value={formData.phoneCell}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formComments">
            <Form.Label>Comentarios</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="comments"
              value={formData.comments}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Guardar cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalEditPaciente;