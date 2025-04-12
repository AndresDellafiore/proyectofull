import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Clients = () => {
  const [clients, setClients] = useState([]);

<<<<<<< HEAD
 useEffect(() => {
  const fetchClients = async () => {
    try {
      const response = await axios.get('http://localhost:5007/api/Client/List');
      const rawClients = Array.isArray(response.data) ? response.data : response.data.$values;

      const cleanedClients = rawClients.map(client => ({
        ...client,
        vehicles: Array.isArray(client.vehicles?.$values) ? client.vehicles.$values : [],
        account: client.account || {} // En caso de que sea null
      }));

      setClients(cleanedClients);
    } catch (error) {
      console.error("Error fetching clients", error);
    }
  };

  fetchClients();
}, []);

  return (
    <div className="container">
=======
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('http://localhost:5007/api/Client/List');
        if (Array.isArray(response.data)) {
          setClients(response.data);
        } else if (response.data?.$values) {
          setClients(response.data.$values);
        } else {
          setClients([]);
        }
      } catch (error) {
        console.error("Error fetching clients", error);
      }
    };

    fetchClients();
  }, []);

  return (
    <div className="container mt-4">
>>>>>>> e0a5afe (Agregué funcionalidad de clientes y correcciones en navegación)
      <h2>Clientes</h2>
      {clients.length === 0 ? (
        <p>No hay clientes registrados</p>
      ) : (
<<<<<<< HEAD
        <ul>
  {clients.map(client => (
    <li key={client.clientId}>
      <p><strong>{client.nombre} {client.apellido}</strong></p>
      <p>Email: {client.mail}</p>
      <p>Cuenta: {client.account?.accountNumber || 'No disponible'}</p>
      <p>Balance: ${client.account?.balance ?? 0}</p>

      <h4>Vehículos</h4>
      {client.vehicles.length > 0 ? (
        client.vehicles.map(vehicle => (
          <div key={vehicle.vehicleId}>
            <p>{vehicle.marca} {vehicle.modelo} ({vehicle.dominio})</p>
          </div>
        ))
      ) : (
        <p>Sin vehículos</p>
      )}
    </li>
  ))}
</ul>
=======
        clients.map((client) => (
          <div key={client.clientId} className="card mb-4">
            <div className="card-header">
              <strong>
                Cochera:{" "}
                {client.vehicles?.length > 0 && client.vehicles[0].cochera
                  ? client.vehicles[0].cochera
                  : "No asignada"}
              </strong>
            </div>
            <div className="card-body">
              <h5 className="card-title">{client.nombre} {client.apellido}</h5>
              <p className="card-text">Email: {client.mail}</p>
              <p className="card-text">Cuenta: {client.account?.accountNumber}</p>
              <p className="card-text">Balance: ${client.account?.balance}</p>

              {client.vehicles && client.vehicles.length > 0 ? (
                <div>
                 <ul className="nav nav-tabs" id={`tabs-${client.clientId}`} role="tablist">
                    {client.vehicles.map((vehicle, index) => (
                      <li className="nav-item" key={vehicle.vehicleId} role="presentation">
                        <button
                          className={`nav-link ${index === 0 ? "active" : ""}`}
                          id={`tab-${client.clientId}-${vehicle.vehicleId}`}
                          data-bs-toggle="tab"
                          data-bs-target={`#pane-${client.clientId}-${vehicle.vehicleId}`}
                          type="button"
                          role="tab"
                          aria-controls={`pane-${client.clientId}-${vehicle.vehicleId}`}
                          aria-selected={index === 0 ? "true" : "false"}
                        >
                          Vehículo {index + 1}
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="tab-content mt-3">
                    {client.vehicles.map((vehicle, index) => (
                      <div
                        key={vehicle.vehicleId}
                        className={`tab-pane fade ${index === 0 ? "show active" : ""}`}
                        id={`pane-${client.clientId}-${vehicle.vehicleId}`}
                        role="tabpanel"
                        aria-labelledby={`tab-${client.clientId}-${vehicle.vehicleId}`}
                      >
                        <p><strong>Marca:</strong> {vehicle.marca}</p>
                        <p><strong>Modelo:</strong> {vehicle.modelo}</p>
                        <p><strong>Dominio:</strong> {vehicle.dominio}</p>
                        <p><strong>Color:</strong> {vehicle.color}</p>
                        <p><strong>Cochera:</strong> {vehicle.cochera ?? "No asignada"}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-muted">Vehículo sin asignar</p>
              )}
            </div>
          </div>
        ))
>>>>>>> e0a5afe (Agregué funcionalidad de clientes y correcciones en navegación)
      )}
    </div>
  );
};

export default Clients;
