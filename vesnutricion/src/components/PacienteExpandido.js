// src/components/PacienteExpandido.js
import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import ModalEditPaciente from "./ModalEditPaciente";

const PacienteExpandido = ({ paciente, onEditar, onEliminar, onCerrar }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Card className="mb-3 shadow-sm">
        <Card.Body>
          <Card.Title>{paciente.fullName}</Card.Title>
          <Card.Text>
            <strong>DNI:</strong> {paciente.dni} <br />
            <strong>Dirección:</strong> {paciente.address} <br />
            <strong>Obra Social:</strong> {paciente.insuranceName} <br />
            <strong>Fecha Nac:</strong> {paciente.birthDate?.split("T")[0]} <br />
            <strong>Edad:</strong> {paciente.edad} <br />
            <strong>Teléfono Fijo:</strong> {paciente.phone} <br />
            <strong>Teléfono Celular:</strong> {paciente.mobile}
          </Card.Text>
          <div className="d-flex justify-content-end mt-3 gap-2">
            <Button variant="warning" className="me-2" onClick={() => setShowModal(true)}>
              Editar
            </Button>
            <Button
              variant="danger"
              onClick={async () => {
                const confirm = window.confirm("¿Seguro que deseas dar de baja al usuario?");
                if (confirm) {
                  await fetch(`http://localhost:5263/api/Users/${paciente.id}`, {
                    method: "DELETE",
                  });
                  onEliminar(paciente.id);
                }
              }}
            >
              Baja Lógica
            </Button>
            <Button variant="secondary" onClick={onCerrar}>
              Cerrar
            </Button>
          </div>
        </Card.Body>
      </Card>

      {showModal && (
        <ModalEditPaciente
          show={showModal}
          onHide={() => setShowModal(false)}
          onSave={onEditar}
          paciente={{
            ...paciente,
            insuranceName: paciente.insuranceName,
            insuranceNumber: paciente.insuranceNumber,
            birthDate: paciente.birthDate,
            phone: paciente.phone,
            mobile: paciente.mobile,
            comments: paciente.comments,
            address: paciente.address,
          }}
        />
      )}
    </>
  );
};

export default PacienteExpandido;