// src/components/ClienteModal.js
import React from 'react';
import { Modal, Button, Tabs, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ClienteModal = ({ client, onClose, onEdit, onDelete }) => {
  if (!client) return null;

  return (
    <Modal show onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{client.nombre} {client.apellido}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Email:</strong> {client.mail}</p>
        <p><strong>Cuenta:</strong> {client.account?.accountNumber ?? 'No disponible'}</p>
        <p><strong>Balance:</strong> ${client.account?.balance ?? 0}</p>
        <p><strong>Administrador:</strong> {client.isAdmin ? 'Sí' : 'No'}</p>

        <h5 className="mt-4">Vehículos</h5>
        {client.vehicles && client.vehicles.length > 0 ? (
          <Tabs defaultActiveKey={0} id="vehiculos-tabs" className="mb-3">
            {client.vehicles.map((vehiculo, idx) => (
              <Tab eventKey={idx} title={`Vehículo ${idx + 1}`} key={idx}>
                <p><strong>Marca:</strong> {vehiculo.marca}</p>
                <p><strong>Modelo:</strong> {vehiculo.modelo}</p>
                <p><strong>Dominio:</strong> {vehiculo.dominio}</p>
                <p><strong>Cochera:</strong> {vehiculo.cochera}</p>
              </Tab>
            ))}
          </Tabs>
        ) : (
          <p>No tiene vehículos registrados</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cerrar</Button>
        <Button variant="primary" onClick={() => onEdit(client)}>Editar</Button>
        <Button variant="danger" onClick={() => onDelete(client.clientId)}>Eliminar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ClienteModal;
