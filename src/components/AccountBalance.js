// src/components/AccountBalance.js
import React, { useState, useEffect } from "react";
import { getAccountBalance } from "../services/api";
import 'bootstrap/dist/css/bootstrap.min.css';

const AccountBalance = ({ clientId }) => {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      const account = await getAccountBalance(clientId);
      setBalance(account.balance);
    };

    fetchBalance();
  }, [clientId]);

  return (
    <div>
      <h2>Balance de Cuenta</h2>
      {balance !== null ? <p>Saldo: ${balance}</p> : <p>Cargando...</p>}
    </div>
  );
};

export default AccountBalance;
