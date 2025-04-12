// src/components/Cuentas.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const Cuentas = () => {
  const [cuentas, setCuentas] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5007/api/account/List") // Verifica que tengas este endpoint
      .then((res) => setCuentas(res.data))
      .catch((err) => console.error("Error al cargar cuentas", err));
  }, []);

  return (
    <div className="container">
      <h2>Balances de Cuentas</h2>
      {cuentas.length === 0 ? (
        <p>No hay cuentas cargadas.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Número de Cuenta</th>
              <th>Balance</th>
              <th>ID Cliente</th>
            </tr>
          </thead>
          <tbody>
            {cuentas.map((cta) => (
              <tr key={cta.accountId}>
                <td>{cta.accountNumber}</td>
                <td>${cta.balance}</td>
                <td>{cta.clientId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Cuentas;
