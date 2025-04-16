import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/global.css';

function GestionPacientes() {
  const [patients, setPatients] = useState([]);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [editing, setEditing] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    // Obtener pacientes activos
    axios.get('http://localhost:5263/api/patients')
      .then((res) => setPatients(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      axios.put(`http://localhost:5263/api/patients/${selectedPatient.id}`, {
        id: selectedPatient.id,
        fullName,
        email,
      }).then(() => {
        setEditing(false);
        setSelectedPatient(null);
        setFullName('');
        setEmail('');
      });
    } else {
      axios.post('http://localhost:5263/api/patients', { fullName, email })
        .then(() => {
          setFullName('');
          setEmail('');
        });
    }
  };

  const handleEdit = (patient) => {
    setEditing(true);
    setSelectedPatient(patient);
    setFullName(patient.fullName);
    setEmail(patient.email);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5263/api/patients/${id}`)
      .then(() => setPatients(patients.filter(p => p.id !== id)));
  };

  return (
    <Container>
      <h2>Gestión de Pacientes</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre Completo</Form.Label>
          <Form.Control
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Correo Electrónico</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Button type="submit">{editing ? 'Actualizar' : 'Agregar'} Paciente</Button>
      </Form>

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.fullName}</td>
              <td>{patient.email}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(patient)}>Editar</Button>
                <Button variant="danger" onClick={() => handleDelete(patient.id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default GestionPacientes;
