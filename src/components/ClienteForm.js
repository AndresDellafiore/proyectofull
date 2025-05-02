// /src/components/ClienteForm.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form, Row, Col, Alert } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const ClienteForm = ({ onClose = () => {}, reload = () => {}, clienteEditando = null }) => {
  const [cliente, setCliente] = useState({
    apellido: "",
    nombre: "",
    domicilio: "",
    telefonoParticular: "",
    telefonoCelular: "",
    mail: "",
    password: "",
    isAdmin: false,
    account: {
      accountNumber: "",
      balance: 0
    },
    vehicles: []
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  useEffect(() => {
    if (clienteEditando) {
      setCliente({
        ...clienteEditando,
        password: "", // No mostrar contraseña
        account: clienteEditando.account ?? { accountNumber: "", balance: 0 },
        vehicles: clienteEditando.vehicles ?? []
      });
    }
  }, [clienteEditando]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente(prev => ({ ...prev, [name]: value }));
  };

  const handleAccountChange = (e) => {
    const { name, value } = e.target;
    setCliente(prev => ({
      ...prev,
      account: {
        ...prev.account,
        [name]: value
      }
    }));
  };

  const handleCheckbox = (e) => {
    setCliente(prev => ({
      ...prev,
      isAdmin: e.target.checked
    }));
  };

  const handleVehicleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedVehicles = [...cliente.vehicles];
    updatedVehicles[index][name] = value;
    setCliente(prev => ({
      ...prev,
      vehicles: updatedVehicles
    }));
  };

  const addVehicle = () => {
    setCliente(prev => ({
      ...prev,
      vehicles: [...prev.vehicles, { marca: "", modelo: "", dominio: "", cochera: "" }]
    }));
  };

  const removeVehicle = (index) => {
    const updated = cliente.vehicles.filter((_, i) => i !== index);
    setCliente(prev => ({
      ...prev,
      vehicles: updated
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!clienteEditando && cliente.password !== confirmPassword) {
      setPasswordMismatch(true);
      return;
    }

    setPasswordMismatch(false);

    try {
      if (clienteEditando) {
        await axios.put("http://localhost:5007/api/Client/Edit", cliente);
      } else {
        await axios.post("http://localhost:5007/api/Client/New", cliente);
      }
      reload();
      onClose();
    } catch (err) {
      console.error("Error al guardar cliente:", err);
      alert("Ocurrió un error al guardar el cliente.");
    }
  };

  return (
    <Modal show onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{clienteEditando ? "Editar Cliente" : "Nuevo Cliente"}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Apellido</Form.Label>
                <Form.Control
                  type="text"
                  name="apellido"
                  value={cliente.apellido}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  value={cliente.nombre}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group>
            <Form.Label>Domicilio</Form.Label>
            <Form.Control
              type="text"
              name="domicilio"
              value={cliente.domicilio}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              name="mail"
              value={cliente.mail}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Teléfono Particular</Form.Label>
            <Form.Control
              type="text"
              name="telefonoParticular"
              value={cliente.telefonoParticular}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Teléfono Celular</Form.Label>
            <Form.Control
              type="text"
              name="telefonoCelular"
              value={cliente.telefonoCelular}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={cliente.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Confirmar Contraseña</Form.Label>
            <Form.Control
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {passwordMismatch && (
              <Alert variant="danger">Las contraseñas no coinciden.</Alert>
            )}
          </Form.Group>

          <Form.Check
            type="checkbox"
            label="Administrador"
            checked={cliente.isAdmin}
            onChange={handleCheckbox}
          />

          <h5>Vehículos</h5>
          {cliente.vehicles.map((vehicle, index) => (
            <div key={index}>
              <Row>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Marca</Form.Label>
                    <Form.Control
                      type="text"
                      name="marca"
                      value={vehicle.marca}
                      onChange={(e) => handleVehicleChange(index, e)}
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Modelo</Form.Label>
                    <Form.Control
                      type="text"
                      name="modelo"
                      value={vehicle.modelo}
                      onChange={(e) => handleVehicleChange(index, e)}
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Dominio</Form.Label>
                    <Form.Control
                      type="text"
                      name="dominio"
                      value={vehicle.dominio}
                      onChange={(e) => handleVehicleChange(index, e)}
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Cochera</Form.Label>
                    <Form.Control
                      type="text"
                      name="cochera"
                      value={vehicle.cochera}
                      onChange={(e) => handleVehicleChange(index, e)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button variant="danger" onClick={() => removeVehicle(index)}>
                Eliminar Vehículo
              </Button>
              <hr />
            </div>
          ))}
          <Button variant="primary" onClick={addVehicle}>
            Agregar Vehículo
          </Button>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>Cerrar</Button>
          <Button variant="primary" type="submit">Guardar</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ClienteForm;
