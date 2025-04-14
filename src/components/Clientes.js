import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Clientes.css';
import ClienteForm from './ClienteForm';
import ClienteModal from './ClienteModal'; // 👈 Asegúrate de tener este archivo

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
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
            className="cliente-card"
            onClick={() => setSelectedClient(client)}
          >
            <h3>Cochera: {client.vehicles[0]?.cochera ?? 'No asignada'}</h3>
            <p><strong>{client.nombre} {client.apellido}</strong></p>
          </div>
        ))}
      </div>

      {selectedClient && (
        <ClienteModal
          client={selectedClient}
          onClose={() => setSelectedClient(null)}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

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
