import React from 'react';
import { Link } from 'react-router-dom';

const PacienteCard = ({ patient }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="col-12 col-md-4 mb-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{patient.fullName}</h5>
          <p className="card-text">DNI: {patient.dni}</p>
          <p className="card-text">Obra Social: {patient.insuranceName}</p>
          <p className="card-text">Teléfono: {patient.phone}</p>
          {user && user.isAdmin && (
            <div className="btn-group">
              <Link to={`/editar-paciente/${patient.id}`} className="btn btn-warning">Editar</Link>
              <button className="btn btn-danger">Baja lógica</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PacienteCard;
