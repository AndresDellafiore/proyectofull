// src/components/VehicleTabs.js
import React, { useState } from "react";

const VehicleTabs = ({ onAddVehicle }) => {
  const [vehicleBrand, setVehicleBrand] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");

  const handleAdd = () => {
    const newVehicle = {
      marca: vehicleBrand,
      modelo: vehicleModel,
      dominio: vehiclePlate
    };
    onAddVehicle(newVehicle);
    setVehicleBrand("");
    setVehicleModel("");
    setVehiclePlate("");
  };

  return (
    <div>
      <h3>Vehículos</h3>
      <div>
        <label>Marca</label>
        <input
          type="text"
          value={vehicleBrand}
          onChange={(e) => setVehicleBrand(e.target.value)}
        />
      </div>
      <div>
        <label>Modelo</label>
        <input
          type="text"
          value={vehicleModel}
          onChange={(e) => setVehicleModel(e.target.value)}
        />
      </div>
      <div>
        <label>Dominio</label>
        <input
          type="text"
          value={vehiclePlate}
          onChange={(e) => setVehiclePlate(e.target.value)}
        />
      </div>
      <button type="button" onClick={handleAdd}>
        Agregar Vehículo
      </button>
    </div>
  );
};

export default VehicleTabs;
