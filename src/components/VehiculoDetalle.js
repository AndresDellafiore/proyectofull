import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const VehiculoDetalle = () => {
  const { vehicleId } = useParams();
  const [vehiculo, setVehiculo] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5007/api/vehicle/${vehicleId}`)  // Este endpoint debería devolver los detalles completos del vehículo
      .then(res => setVehiculo(res.data))
      .catch(err => console.error("Error al cargar los detalles del vehículo", err));
  }, [vehicleId]);

  if (!vehiculo) {
    return <p>Cargando detalles del vehículo...</p>;
  }

  return (
    <div className="container mt-4">
      <h2>Detalles del Vehículo</h2>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{vehiculo.marca} {vehiculo.modelo}</h5>
          <p><strong>Dominio:</strong> {vehiculo.dominio}</p>
          <p><strong>Color:</strong> {vehiculo.color}</p>
          <p><strong>Cliente ID:</strong> {vehiculo.clientId}</p>
          <p><strong>Cochera:</strong> {vehiculo.cochera ? vehiculo.cochera : 'No asignada'}</p>
        </div>
      </div>
    </div>
  );
};

export default VehiculoDetalle;
