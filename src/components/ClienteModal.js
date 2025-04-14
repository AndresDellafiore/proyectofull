// src/components/ClienteModal.js
import React from 'react';
import './ClienteModal.css';

const ClienteModal = ({ client, onClose, onEdit, onDelete }) => {
    if (!client) return null; // 👈 Esto evita que el modal se renderice si no hay cliente
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>X</button>
        <h2>{client.nombre} {client.apellido}</h2>
        <p><strong>Email:</strong> {client.mail}</p>
        <p><strong>Cuenta:</strong> {client.account?.accountNumber ?? 'No disponible'}</p>
        <p><strong>Balance:</strong> ${client.account?.balance ?? 0}</p>
        <p><strong>Administrador:</strong> {client.isAdmin ? 'Sí' : 'No'}</p>

        <div className="vehiculo-info">
          <p><strong>Vehículos:</strong></p>
          {client.vehicles.length === 0 ? (
            <p>No tiene vehículos registrados</p>
          ) : (
            client.vehicles.map((vehiculo, idx) => (
              <div key={idx}>
                <p>- {vehiculo.marca} {vehiculo.modelo} ({vehiculo.dominio}) - Cochera {vehiculo.cochera}</p>
              </div>
            ))
          )}
        </div>

        <div className="card-actions">
          <button onClick={() => alert('Editar aún no implementado')}>Editar</button>
          <button onClick={() => alert('Eliminar aún no implementado')}>Eliminar</button>
        </div>
      </div>
    </div>
  );
};

export default ClienteModal;
