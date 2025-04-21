// src/components/NuevoTurnoModal.js
import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import axios from "axios";

const NuevoTurnoModal = ({ show, handleClose }) => {
  const [pacientes, setPacientes] = useState([]);
  const [loadingPacientes, setLoadingPacientes] = useState(true);
  const [turno, setTurno] = useState({
    userId: "",
    appointmentDate: "",
    reason: "",
    observations: "",
    comments: "",
  });

  useEffect(() => {
    const fetchPacientes = async () => {
      setLoadingPacientes(true);
      try {
        const res = await axios.get("http://localhost:5263/api/users");
        const pacientesFiltrados = res.data.filter((u) => !u.isAdmin);
        setPacientes(pacientesFiltrados);
      } catch (error) {
        console.error("Error al obtener pacientes:", error);
      } finally {
        setLoadingPacientes(false);
      }
    };

    if (show) {
      fetchPacientes();
    }
  }, [show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTurno((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!turno.userId) {
      alert("Debe seleccionar un paciente");
      return;
    }

    const pacienteSeleccionado = pacientes.find(
      (p) => p.id === parseInt(turno.userId)
    );

    if (!pacienteSeleccionado) {
      alert("Paciente no encontrado");
      return;
    }

    // Validar si ya hay un turno en esa fecha u horario cercano (±30 min)
    try {
      const res = await axios.get("http://localhost:5263/api/appointments");
      const existingAppointments = res.data.filter(app => app.isActive !== false);

      const selectedDate = new Date(turno.appointmentDate);
      const selectedTime = selectedDate.getTime();

      const hasConflict = existingAppointments.some((app) => {
        const existingDate = new Date(app.appointmentDate).getTime();
        const diffInMinutes = Math.abs(existingDate - selectedTime) / (1000 * 60);
        return diffInMinutes < 30;
      });

      if (hasConflict) {
        alert("Turno no disponible. Ya hay otro turno asignado en ese horario o cercano.");
        return;
      }

      const turnoCompleto = {
        ...turno,
        patientName: pacienteSeleccionado.fullName,
        email: pacienteSeleccionado.email,
      };

      await axios.post("http://localhost:5263/api/appointments", turnoCompleto);
      alert("Turno solicitado correctamente");
      handleClose();
    } catch (error) {
      console.error("Error al verificar o solicitar turno:", error);
      alert("Error al solicitar turno: " + error.message);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Solicitar Turno</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="userId">
            <Form.Label>Paciente</Form.Label>
            {loadingPacientes ? (
              <div><Spinner animation="border" size="sm" /> Cargando pacientes...</div>
            ) : pacientes.length === 0 ? (
              <div>No hay pacientes disponibles</div>
            ) : (
              <Form.Select
                name="userId"
                value={turno.userId}
                onChange={handleChange}
              >
                <option value="">Seleccione un paciente</option>
                {pacientes.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.fullName} ({p.email})
                  </option>
                ))}
              </Form.Select>
            )}
          </Form.Group>

          <Form.Group controlId="appointmentDate" className="mt-3">
            <Form.Label>Fecha y hora de consulta</Form.Label>
            <Form.Control
              type="datetime-local"
              name="appointmentDate"
              value={turno.appointmentDate}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="reason" className="mt-3">
            <Form.Label>Motivo</Form.Label>
            <Form.Select
              name="reason"
              value={turno.reason}
              onChange={handleChange}
            >
              <option value="">Seleccione un motivo</option>
              <option value="Nutricionista">Nutricionista</option>
              <option value="Médico">Médico</option>
              <option value="Otro">Otro</option>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="observations" className="mt-3">
            <Form.Label>Observaciones</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="observations"
              value={turno.observations}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="comments" className="mt-3">
            <Form.Label>Comentarios</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="comments"
              value={turno.comments}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Solicitar Turno
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NuevoTurnoModal;
