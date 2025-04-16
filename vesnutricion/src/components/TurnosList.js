import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import DetalleTurnoModal from './DetalleTurnoModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/global.css';

function TurnosList() {
  const [turnos, setTurnos] = useState([]);
  const [turnoSeleccionado, setTurnoSeleccionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5263/api/appointments")
      .then(res => setTurnos(res.data))
      .catch(err => console.error(err));
  }, []);

  const cancelarTurno = (id) => {
    axios.delete(`http://localhost:5263/api/appointments/${id}`)
      .then(() => setTurnos(turnos.filter(t => t.id !== id)));
  };

  const abrirModal = (turno) => {
    setTurnoSeleccionado(turno);
    setMostrarModal(true);
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-success">Mis Turnos</h2>
      <Button variant="success" className="mb-3" onClick={() => navigate('/nuevo')}>+ Nuevo Turno</Button>
      <Row xs={1} md={2} lg={3} className="g-4">
        {turnos.map(turno => (
          <Col key={turno.id}>
            <Card className="card-nutricion">
              <Card.Body>
                <Card.Title>{turno.patientName}</Card.Title>
                <Card.Text>
                  <strong>Fecha:</strong> {new Date(turno.date).toLocaleString()}
                </Card.Text>
                <div className="d-flex justify-content-between">
                  <Button variant="outline-success" size="sm" onClick={() => abrirModal(turno)}>Ver</Button>
                  <Button variant="outline-danger" size="sm" onClick={() => cancelarTurno(turno.id)}>Cancelar</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <DetalleTurnoModal
        show={mostrarModal}
        onHide={() => setMostrarModal(false)}
        turno={turnoSeleccionado}
      />
    </Container>
  );
}

export default TurnosList;
