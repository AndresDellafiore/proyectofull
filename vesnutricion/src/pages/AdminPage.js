import React from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/global.css';

function AdminPage() {
  return (
    <Container>
      <h1>Bienvenido a la Administración</h1>
      <p>Desde aquí podrás gestionar pacientes, historias clínicas y turnos.</p>
      {/* Aquí va el menú para el administrador */}
      <ul>
        <li><a href="/admin/pacientes">Gestionar Pacientes</a></li>
        <li><a href="/admin/historias">Gestionar Historias Clínicas</a></li>
        <li><a href="/admin/calendario-turnos">Calendario de Turnos</a></li>
      </ul>
    </Container>
  );
}

export default AdminPage;
