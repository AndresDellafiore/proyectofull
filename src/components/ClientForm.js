import React, { useState } from "react";
import axios from "axios";

const ClienteForm = () => {
  const [cliente, setCliente] = useState({
    apellido: "",
    nombre: "",
    domicilio: "",
    telefonoParticular: "",
    telefonoCelular: "",
    mail: "",
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

  const agregarVehiculo = () => {
    setCliente({
      ...cliente,
      vehicles: [...cliente.vehicles, vehiculo]
    });
    setVehiculo({ marca: "", modelo: "", dominio: "", color: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente({ ...cliente, [name]: value });
  };

  const handleVehiculoChange = (e) => {
    const { name, value } = e.target;
    setVehiculo({ ...vehiculo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5007/api/Client/New", cliente);
      alert("Cliente creado exitosamente");
    } catch (error) {
      alert("Error al crear el cliente");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Alta de Cliente</h2>
      <input name="apellido" placeholder="Apellido" onChange={handleChange} />
      <input name="nombre" placeholder="Nombre" onChange={handleChange} />
      <input name="domicilio" placeholder="Domicilio" onChange={handleChange} />
      <input name="telefonoParticular" placeholder="Tel. Particular" onChange={handleChange} />
      <input name="telefonoCelular" placeholder="Celular" onChange={handleChange} />
      <input name="mail" placeholder="Mail" onChange={handleChange} />
      <h3>Cuenta</h3>
      <input
        placeholder="Nro. Cuenta"
        onChange={(e) => setCliente({ ...cliente, account: { ...cliente.account, accountNumber: e.target.value } })}
      />
      <input
        type="number"
        placeholder="Balance"
        onChange={(e) => setCliente({ ...cliente, account: { ...cliente.account, balance: parseFloat(e.target.value) } })}
      />
      <h3>Vehículo</h3>
      <input name="marca" placeholder="Marca" onChange={handleVehiculoChange} value={vehiculo.marca} />
      <input name="modelo" placeholder="Modelo" onChange={handleVehiculoChange} value={vehiculo.modelo} />
      <input name="dominio" placeholder="Dominio" onChange={handleVehiculoChange} value={vehiculo.dominio} />
      <input name="color" placeholder="Color" onChange={handleVehiculoChange} value={vehiculo.color} />
      <button type="button" onClick={agregarVehiculo}>Agregar Vehículo</button>
      <button type="submit">Guardar Cliente</button>
    </form>
  );
};

export default ClienteForm;

