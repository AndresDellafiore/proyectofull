import React, { useEffect, useState } from "react";
import axios from "axios";

const Clientes = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5007/api/Client/List")
      .then((res) => setClientes(res.data))
      .catch((err) => console.error("Error al cargar clientes", err));
  }, []);

  return (
    <div>
      <h2>Clientes</h2>
      {clientes.map((cli) => (
        <div key={cli.clientId} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
          <p><strong>Nombre:</strong> {cli.nombre} {cli.apellido}</p>
          <p><strong>Domicilio:</strong> {cli.domicilio}</p>
          <p><strong>Email:</strong> {cli.mail}</p>
          <p><strong>Cuenta:</strong> {cli.account?.accountNumber} - ${cli.account?.balance}</p>
          <h4>Vehículos</h4>
          {cli.vehicles?.map((veh, index) => (
            <div key={index}>
              <p>{veh.marca} {veh.modelo} ({veh.dominio})</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Clientes;
