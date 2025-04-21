// src/pages/PacientesPage.js
import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Tab,
  Tabs,
  Form,
  Button,
} from "react-bootstrap";
import PacienteCard from "../components/PacienteCard";
import PacienteExpandido from "../components/PacienteExpandido";
import NuevoPaciente from "../components/NuevoPaciente";  // Importamos el componente

const PacientesPage = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [tabActiva, setTabActiva] = useState("pacientes");
  const [mostrarNuevoPaciente, setMostrarNuevoPaciente] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5263/api/Users")
      .then((res) => res.json())
      .then((data) => setUsuarios(data));
  }, []);

  const handleEditar = (actualizado) => {
    const nuevos = usuarios.map((u) =>
      u.id === actualizado.id ? actualizado : u
    );
    setUsuarios(nuevos);
    setPacienteSeleccionado(null);
  };

  const handleEliminar = (id) => {
    const nuevos = usuarios.filter((u) => u.id !== id);
    setUsuarios(nuevos);
    setPacienteSeleccionado(null);
  };

  const cambiarTab = (key) => {
    setTabActiva(key);
    setPacienteSeleccionado(null); // cerrar card expandida al cambiar tab
  };

  const handleNuevoPaciente = (nuevo) => {
    setUsuarios([...usuarios, nuevo]);
  };

  const filtrados = usuarios.filter((u) =>
    (tabActiva === "pacientes" ? !u.isAdmin : u.isAdmin)
  ).filter((u) =>
    (u.fullName || "").toLowerCase().includes((busqueda || "").toLowerCase())
  );

  return (
    <Container>
      <Row className="my-4">
        <Col>
          <h2>Gestión de Usuarios</h2>
        </Col>
      </Row>

      <Row>
        <Col>
          <Tabs activeKey={tabActiva} onSelect={(k) => cambiarTab(k)} className="mb-3">
            <Tab eventKey="pacientes" title="Pacientes" />
            <Tab eventKey="admins" title="Administradores" />
          </Tabs>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Buscar por nombre..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </Col>
        <Col md={6}>
          <Button variant="primary" onClick={() => setMostrarNuevoPaciente(true)}>
            Crear Nuevo Paciente
          </Button>
        </Col>
      </Row>

      {mostrarNuevoPaciente && (
        <NuevoPaciente
          onClose={() => setMostrarNuevoPaciente(false)}
          onGuardar={handleNuevoPaciente}
        />
      )}

      {pacienteSeleccionado ? (
        <PacienteExpandido
          paciente={pacienteSeleccionado}
          onEditar={handleEditar}
          onEliminar={handleEliminar}
          onCerrar={() => setPacienteSeleccionado(null)}
        />
      ) : (
        <Row>
          {filtrados.map((p) => (
            <Col key={p.id} md={4} className="mb-4">
              <PacienteCard paciente={p} onVerDetalle={() => setPacienteSeleccionado(p)} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default PacientesPage;
