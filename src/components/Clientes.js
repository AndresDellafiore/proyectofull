import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Clients = () => {
  const [clients, setClients] = useState([]);

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
    <div>
      <h2>Clientes</h2>
      {clients.length === 0 ? (
        <p>No hay clientes registrados</p>
      ) : (
        <ul>
          {clients.map(client => (
            <li key={client.clientId}>
              <p><strong>{client.nombre} {client.apellido}</strong></p>
              <p>Email: {client.mail}</p>
              <p>Cuenta: {client.account.accountNumber}</p>
              <p>Balance: ${client.account.balance}</p>
              <h4>Vehículos</h4>
              {client.vehicles.map(vehicle => (
                <div key={vehicle.vehicleId}>
                  <p>{vehicle.marca} {vehicle.modelo} ({vehicle.dominio})</p>
                </div>
              ))}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Clients;

