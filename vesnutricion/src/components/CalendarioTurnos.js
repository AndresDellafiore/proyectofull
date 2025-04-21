// src/components/CalendarioTurnos.js
import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const CalendarioTurnos = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate(); // <- Agregado

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:5263/api/appointments");
        const events = res.data.map((turno) => ({
          id: turno.id,
          title: `${turno.patientName} - ${turno.reason}`,
          start: new Date(turno.appointmentDate),
          end: new Date(turno.appointmentDate),
        }));
        setEvents(events);
      } catch (error) {
        console.error("Error al cargar turnos:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleEventClick = (event) => {
    navigate(`/turnos/detalle/${event.id}`); // <- navegación con React Router
  };

  return (
    <div className="container-fluid" style={{ paddingTop: "20px" }}>
      <div
        style={{
          height: "80vh",
          width: "100%",
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          padding: "20px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultView={Views.MONTH}
          views={["month", "week", "day"]}
          onSelectEvent={handleEventClick}
          style={{ height: "100%", width: "100%" }}
        />
      </div>
    </div>
  );
};

export default CalendarioTurnos;