import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PacienteCard from './PacienteCard';

const PacientesPage = () => {
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      const fetchPatients = async () => {
        try {
          const response = await axios.get('http://localhost:5263/api/Users');
          setPatients(response.data);
        } catch (error) {
          setError('Error al cargar los pacientes');
        }
      };
      fetchPatients();
    }
  }, []);

  return (
    <div className="container mt-4">
      <h2>Pacientes</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        {patients.map(patient => (
          <PacienteCard key={patient.id} patient={patient} />
        ))}
      </div>
    </div>
  );
};

export default PacientesPage;
