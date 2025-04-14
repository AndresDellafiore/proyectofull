import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Clientes.css';
import ClienteForm from './ClienteForm'; // 👈 Asegurate de importar correctamente

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [showForm, setShowForm] = useState(false);
  const [clienteEditando, setClienteEditando] = useState(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    const res = await axios.get('http://localhost:5007/api/Client/List');
    const rawClients = Array.isArray(res.data) ? res.data : res.data.$values;

    const cleaned = rawClients.map(client => ({
      ...client,
      vehicles: Array.isArray(client.vehicles?.$values) ? client.vehicles.$values : [],
      account: client.account || {}
    }));

    setClients(cleaned);
  };

  const handleCardClick = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Dar de baja este cliente?")) {
      await axios.put(`http://localhost:5007/api/Client/DeleteLogical/${id}`);
      fetchClients();
    }
  };

  const handleEdit = (cliente) => {
    setClienteEditando(cliente);
    setShowForm(true);
  };

  const indexOfLast = currentPage * itemsPerPage;
  const currentClients = clients.slice(indexOfLast - itemsPerPage, indexOfLast);
  const totalPages = Math.ceil(clients.length / itemsPerPage);

  return (
    <div className="clientes-container">
      <h2>Clientes</h2>

      <button onClick={() => { setClienteEditando(null); setShowForm(true); }}>+ Nuevo Cliente</button>

      {showForm && (
        <ClienteForm onClose={() => setShowForm(false)} clienteEditando={clienteEditando} reload={fetchClients} />
      )}

      <div className="card-grid">
        {currentClients.map(client => (
          <div
            key={client.clientId}
            className={`cliente-card ${expandedCard === client.clientId ? 'expanded' : ''}`}
            onClick={() => handleCardClick(client.clientId)}
          >
            <h3>Cochera: {client.vehicles[0]?.cochera ?? 'No asignada'}</h3>
            <p><strong>{client.nombre} {client.apellido}</strong></p>

            {expandedCard === client.clientId && (
              <div className="extra-info">
                <p><strong>Email:</strong> {client.mail}</p>
                <p><strong>Cuenta:</strong> {client.account?.accountNumber ?? 'No disponible'}</p>
                <p><strong>Balance:</strong> ${client.account?.balance ?? 0}</p>
                <p><strong>Administrador:</strong> {client.isAdmin ? 'Sí' : 'No'}</p>

                <div className="card-actions">
                  <button onClick={(e) => { e.stopPropagation(); handleEdit(client); }}>Editar</button>
                  <button onClick={(e) => { e.stopPropagation(); handleDelete(client.clientId); }}>Baja</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="pagination">
        {[...Array(totalPages).keys()].map(num => (
          <button key={num} className={currentPage === num + 1 ? 'active' : ''} onClick={() => setCurrentPage(num + 1)}>
            {num + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Clients;


