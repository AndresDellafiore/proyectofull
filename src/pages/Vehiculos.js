// src/pages/Vehiculos.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Vehiculos = () => {
  const [vehiculos, setVehiculos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5007/api/vehicle/List')  // Este endpoint debe listar todos los vehículos
      .then(res => setVehiculos(res.data))
      .catch(err => console.error("Error al cargar vehículos", err));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Vehículos</h2>
      <div className="row">
        {vehiculos.map((vehiculo) => (
          <div className="col-md-4" key={vehiculo.vehicleId}>
            <div className="card mb-4" style={{ width: '18rem' }}>
              <img src={`https://via.placeholder.com/150`} className="card-img-top" alt={vehiculo.marca} />
              <div className="card-body">
                <h5 className="card-title">{vehiculo.marca} {vehiculo.modelo}</h5>
                <p className="card-text">Dominio: {vehiculo.dominio}</p>
                <Link to={`/vehiculo/${vehiculo.vehicleId}`} className="btn btn-primary">Ver detalles</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vehiculos;
