// src/components/NuevoTurno.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getPatients } from '../services/patientService';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/global.css';

const NuevoTurno = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [fecha, setFecha] = useState('');
  const [motivo, setMotivo] = useState('');

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await getPatients();
        setPatients(data);
      } catch (error) {
        console.error('Error al cargar pacientes', error);
      }
    };

    fetchPatients();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedPatient = patients.find(p => p.id === parseInt(selectedPatientId));
    if (!selectedPatient) {
      alert('Paciente no válido');
      return;
    }

    const nuevoTurno = {
      patientName: selectedPatient.fullName,
      date: fecha,
      reason: motivo
    };

    try {
      await axios.post('http://localhost:5263/api/Appointments', nuevoTurno);
      alert('Turno creado correctamente');
      setSelectedPatientId('');
      setFecha('');
      setMotivo('');
    } catch (error) {
      console.error('Error al crear turno', error);
      alert('Error al crear turno');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Nuevo Turno</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Paciente</label>
          <select
            className="form-select"
            value={selectedPatientId}
            onChange={(e) => setSelectedPatientId(e.target.value)}
            required
          >
            <option value="">Seleccionar paciente</option>
            {patients.map((p) => (
              <option key={p.id} value={p.id}>
                {p.fullName} ({p.email})
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label>Fecha</label>
          <input
            type="datetime-local"
            className="form-control"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Motivo</label>
          <input
            type="text"
            className="form-control"
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Crear Turno
        </button>
      </form>
    </div>
  );
};

export default NuevoTurno;
