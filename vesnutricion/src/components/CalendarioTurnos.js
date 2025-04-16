// src/components/CalendarioTurnos.js
import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/global.css';

function CalendarioTurnos() {
  const [turnos, setTurnos] = useState([]);
  const [turnoSeleccionado, setTurnoSeleccionado] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5263/api/Appointments")
      .then(res => setTurnos(res.data))
      .catch(err => console.error(err));
  }, []);

  const eventos = turnos.map(t => ({
    title: t.patientName,
    date: t.date,
    extendedProps: t
  }));

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={eventos}
        eventClick={({ event }) => setTurnoSeleccionado(event.extendedProps)}
      />
      {turnoSeleccionado && (
        <div className="card mt-4 p-3 border">
          <h5>Turno de {turnoSeleccionado.patientName}</h5>
          <p><strong>Fecha:</strong> {new Date(turnoSeleccionado.date).toLocaleString()}</p>
          <p><strong>Motivo:</strong> {turnoSeleccionado.reason}</p>
        </div>
      )}
    </>
  );
}

export default CalendarioTurnos;
