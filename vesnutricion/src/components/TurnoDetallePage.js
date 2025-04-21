// src/components/TurnoDetallePage.js
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const TurnoDetallePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [turno, setTurno] = useState(null);

  useEffect(() => {
    const fetchTurno = async () => {
      try {
        const response = await axios.get(`http://localhost:5263/api/appointments/${id}`);
        setTurno(response.data);
      } catch (error) {
        console.error("Error al obtener el turno:", error);
      }
    };
    fetchTurno();
  }, [id]);

  const handleClose = () => {
    navigate("/turnos");
  };

  const handleBajaLogica = async () => {
    try {
      await axios.put(`http://localhost:5263/api/appointments/deactivate/${id}`);
      alert("Turno liberado correctamente.");
      navigate("/turnos");
    } catch (error) {
      console.error("Error al liberar el turno:", error);
      alert("Ocurrió un error al intentar liberar el turno.");
    }
  };

  return (
    <div className="container mt-4">
      {turno ? (
        <div className="card p-4 shadow-sm">
          <h3 className="mb-3">Detalle del Turno</h3>
          <p><strong>Paciente:</strong> {turno.patientName}</p>
          <p><strong>Fecha de consulta:</strong> {new Date(turno.appointmentDate).toLocaleString()}</p>
          <p><strong>Motivo:</strong> {turno.reason}</p>
          <p><strong>Observaciones:</strong> {turno.observations}</p>
          <p><strong>Comentarios:</strong> {turno.comments}</p>
          <div className="d-flex gap-2 mt-3">
            <Button variant="secondary" onClick={handleClose}>Cerrar Detalles</Button>
            <Button variant="danger" onClick={handleBajaLogica}>Liberar Turno</Button>
          </div>
        </div>
      ) : (
        <p>Cargando detalles del turno...</p>
      )}
    </div>
  );
};

export default TurnoDetallePage;