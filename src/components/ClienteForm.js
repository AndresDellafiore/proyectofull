// src/components/ClienteForm.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const ClienteForm = ({ onClose = () => {}, reload = () => {}, clienteEditando = null }) => {
  const [cliente, setCliente] = useState({
    apellido: "",
    nombre: "",
    domicilio: "",
    telefonoParticular: "",
    telefonoCelular: "",
    mail: "",
    password: "", // 🟡 Necesario para el endpoint POST
    isAdmin: false,
    account: {
      accountNumber: "",
      balance: 0
    },
    vehicles: []
  });

  useEffect(() => {
    if (clienteEditando) {
      setCliente(clienteEditando);
    }
  }, [clienteEditando]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (clienteEditando) {
        await axios.put(`http://localhost:5007/api/Client/Edit`, cliente);
      } else {
        await axios.post(`http://localhost:5007/api/Client/New`, cliente);
      }

      reload();
      onClose();
    } catch (error) {
      console.error("Error al guardar cliente:", error);
      alert("Hubo un error al guardar el cliente. Ver consola para más detalles.");
    }
  };

  return (
    <Modal show onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{clienteEditando ? "Editar Cliente" : "Nuevo Cliente"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={cliente.nombre}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              name="apellido"
              value={cliente.apellido}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="mail"
              value={cliente.mail}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Mostrar password solo si estamos creando uno nuevo */}
          {!clienteEditando && (
            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={cliente.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
          )}

          <Button variant="primary" type="submit">
            Guardar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ClienteForm;
