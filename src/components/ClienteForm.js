import React, { useState } from "react";
import axios from "axios";
import CambioPasswordForm from "./CambioPasswordForm"; // Asegurate de tener este archivo creado

const ClienteForm = ({ onClose = () => {}, reload = () => {}, clienteEditando = null }) => {
  const [cliente, setCliente] = useState({
    apellido: "",
    nombre: "",
    domicilio: "",
    telefonoParticular: "",
    telefonoCelular: "",
    mail: "",
    isAdmin: false,
    account: {
      accountNumber: "",
      balance: 0
    },
    vehicles: []
  });

  const [vehiculo, setVehiculo] = useState({
    marca: "",
    modelo: "",
    dominio: "",
    color: ""
  });

  const [mostrarCambioPassword, setMostrarCambioPassword] = useState(false);

  // Aquí puedes agregar la lógica para manejar el clienteEditando y otros estados.
  // Esto es solo un ejemplo básico para que puedas empezar.

  return (
    <div>
      <h2>{clienteEditando ? 'Editar Cliente' : 'Nuevo Cliente'}</h2>
      {/* Formulario para ingresar los datos del cliente */}
      {/* Aquí puedes agregar más campos o funcionalidad como lo necesites */}
      <button onClick={onClose}>Cerrar</button>
    </div>
  );
};

export default ClienteForm;
