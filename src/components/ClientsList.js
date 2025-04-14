// src/components/ClientsList.js
import React, { useState, useEffect } from "react";
import { getAllClients } from "../services/api";
import 'bootstrap/dist/css/bootstrap.min.css';

const ClientsList = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      const clientsData = await getAllClients();
      setClients(clientsData);
    };

    fetchClients();
  }, []);

  return (
    <div>
      <h2>Lista de Clientes</h2>
      {clients.map((client) => (
        <div key={client.clientId}>
          <h3>{client.nombre}</h3>
          <p>Email: {client.email}</p>
          <p>Dirección: {client.domicilio}</p>
          <h4>Vehículos</h4>
          <ul>
            {client.vehicles.map((vehicle) => (
              <li key={vehicle.dominio}>{vehicle.marca} {vehicle.modelo} - {vehicle.dominio}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ClientsList;
