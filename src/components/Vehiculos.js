// src/components/Vehiculos.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const Vehiculos = () => {
  const [vehiculos, setVehiculos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5007/api/vehicle/List") // Asegurate que este endpoint exista en tu backend
      .then((res) => setVehiculos(res.data))
      .catch((err) => console.error("Error al cargar vehículos", err));
  }, []);

  return (
    <div className="container">
      <h2>Vehículos</h2>
      {vehiculos.length === 0 ? (
        <p>No hay vehículos cargados.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Dominio</th>
              <th>Color</th>
              <th>Cliente ID</th>
            </tr>
          </thead>
          <tbody>
            {vehiculos.map((veh) => (
              <tr key={veh.vehicleId}>
                <td>{veh.marca}</td>
                <td>{veh.modelo}</td>
                <td>{veh.dominio}</td>
                <td>{veh.color}</td>
                <td>{veh.clientId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Vehiculos;
