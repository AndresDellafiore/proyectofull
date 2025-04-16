import axios from 'axios';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Tabs, Tab } from 'react-bootstrap';
import PacienteCard from './PacienteCard';
import PacienteExpandido from './PacienteExpandido';
import '../styles/global.css';

function PacientesPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedPaciente, setSelectedPaciente] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5263/api/Users')
      .then((res) => setUsuarios(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredUsuarios = usuarios.filter(user =>
    user.fullName.toLowerCase().includes(search.toLowerCase())
  );

  const pacientes = filteredUsuarios.filter(user => !user.isAdmin);
  const administradores = filteredUsuarios.filter(user => user.isAdmin);

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Gestión de Pacientes</h2>

      <Form className="mb-4">
        <Form.Control
          type="text"
          placeholder="Buscar paciente por nombre"
          value={search}
          onChange={handleSearch}
        />
      </Form>

      <Tabs defaultActiveKey="pacientes" id="pacientes-tabs">
        <Tab eventKey="pacientes" title="Pacientes">
          <Row>
            {pacientes.slice(0, 6).map((paciente) => (
              <Col md={4} key={paciente.id}>
                <PacienteCard paciente={paciente} onClick={() => setSelectedPaciente(paciente)} />
              </Col>
            ))}
          </Row>
        </Tab>
        <Tab eventKey="administradores" title="Administradores">
          <Row>
            {administradores.slice(0, 6).map((admin) => (
              <Col md={4} key={admin.id}>
                <PacienteCard paciente={admin} onClick={() => setSelectedPaciente(admin)} />
              </Col>
            ))}
          </Row>
        </Tab>
      </Tabs>

      {selectedPaciente && (
        <PacienteExpandido paciente={selectedPaciente} onClose={() => setSelectedPaciente(null)} />
      )}
    </Container>
  );
}

export default PacientesPage;
