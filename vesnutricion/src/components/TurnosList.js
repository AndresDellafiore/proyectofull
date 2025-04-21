// src/components/TurnosList.js
//import React from "react";
//import { Table, Button } from "react-bootstrap";
//import { FaTrashAlt } from "react-icons/fa";
//
//const TurnosList = ({ turnos, onDelete, onSelect }) => {
//  return (
//    <Table striped bordered hover>
//      <thead>
//        <tr>
//          <th>Nombre del Paciente</th>
//          <th>Fecha y Hora</th>
//          <th>Motivo</th>
//          <th>Acciones</th>
//        </tr>
//      </thead>
//      <tbody>
//        {turnos.map((turno) => (
//          <tr key={turno.id} onClick={() => onSelect(turno)}>
//            <td>{turno.patientName}</td>
//            <td>{new Date(turno.dateTime).toLocaleString()}</td>
//            <td>{turno.reason}</td>
//            <td>
//              <Button variant="danger" onClick={() => onDelete(turno.id)}>
//                <FaTrashAlt />
//              </Button>
//            </td>
//          </tr>
//        ))}
//      </tbody>
//    </Table>
//  );
//};
//
//export default TurnosList;
