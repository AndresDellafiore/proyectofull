import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ModalEditPaciente = ({ patientId, onClose }) => {
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await axios.get(`http://localhost:5263/api/Users/${patientId}`);
        setPatient(response.data);
      } catch (error) {
        console.error('Error al obtener los datos del paciente:', error);
      }
    };
    fetchPatient();
  }, [patientId]);

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5263/api/Users/${patientId}`, patient);
      onClose();
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
    }
  };

  if (!patient) return null;

  return (
    <div className="modal show" style={{ display: 'block' }} aria-labelledby="exampleModalLabel">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Editar Paciente</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                value={patient.firstName}
                onChange={(e) => setPatient({ ...patient, firstName: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Apellido</label>
              <input
                type="text"
                className="form-control"
                value={patient.lastName}
                onChange={(e) => setPatient({ ...patient, lastName: e.target.value })}
              />
            </div>
            {/* Aquí irían otros campos editables, como dirección, teléfono, etc. */}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cerrar</button>
            <button type="button" className="btn btn-primary" onClick={handleSave}>Guardar cambios</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalEditPaciente;
