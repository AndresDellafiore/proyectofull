// src/components/ModalEditPaciente.js
import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const ModalEditPaciente = ({ show, onHide, paciente, onSave }) => {
  const [formData, setFormData] = useState({});
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (paciente) {     
      setFormData({
        id: paciente.id,
        firstName: paciente.firstName || "",
        lastName: paciente.lastName || "",       
        dni: paciente.dni || "",
        address: paciente.address || "",
        insuranceName: paciente.insuranceName || "",
        insuranceNumber: paciente.insuranceNumber || "",
        // Asegurarse de que birthDate esté en formato yyyy-MM-dd
        birthDate: paciente.birthDate ? paciente.birthDate.split("T")[0] : "",
        phone: paciente.phone || "",
        mobile: paciente.mobile || "",
        comments: paciente.comments || "",
        isAdmin: paciente.isAdmin || false,
        isActive: true,
        email: paciente.email || "",
        password: "", // ← NO cargar contraseña de base
        role: paciente.isAdmin ? "admin" : "paciente",
      });
      setConfirmPassword(""); // ← También vacío;
    }
  }, [paciente]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: newValue,
      };

      if (name === "isAdmin") {
        updated.role = newValue ? "admin" : "paciente";
      }

      // Asegurarse de que birthDate siempre sea una cadena en formato yyyy-MM-dd
      //if (name === "birthDate" && value) {
       // updated.birthDate = value.split("T")[0]; // Este paso asegura que el valor es adecuado para el input tipo date
      //}

      return updated;
    });
    if (name === "password" || name === "confirmPassword") {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== confirmPassword) {
      setPasswordError("Las contraseñas no coinciden");
      return;
    }
    // Convertir birthDate a formato completo con hora
    const formattedBirthDate = formData.birthDate
      ? `${formData.birthDate}T00:00:00`
      : null;

    const body = {
      id: formData.id,
      firstName: formData.firstName,
      lastName: formData.lastName,
      fullName: "",
      email: formData.email,
      password: formData.password,
      role: formData.role, 
      dni: formData.dni,
      address: formData.address, // <-- MAPEADO CORRECTO
      insuranceName: formData.insuranceName, // <-- CAMBIO AQUÍ
      insuranceNumber: formData.insuranceNumber,
      birthDate: formattedBirthDate,  // <--- CORREGIDO AQUÍ
      phone: formData.phone,
      mobile: formData.mobile,
      comments: formData.comments,
      isAdmin: formData.isAdmin,
      isActive: true,           
    };   

    try {
      
      const response = await fetch(`http://localhost:5263/api/Users/${formData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },       
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const updated = await response.json();
        onSave(updated);
        onHide();
      } else {        
        alert("Error al actualizar el usuario");
      }
    } catch (error) {
      console.error("Error al actualizar:", error);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Usuario {formData.firstName} {formData.lastName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>DNI</Form.Label>
            <Form.Control
              type="text"
              name="dni"
              value={formData.dni}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Obra Social</Form.Label>
            <Form.Control
              type="text"
              name="insuranceName"
              value={formData.insuranceName}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>N° de Obra Social</Form.Label>
            <Form.Control
              type="text"
              name="insuranceNumber"
              value={formData.insuranceNumber}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Fecha de Nacimiento</Form.Label>
            <Form.Control
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Teléfono Fijo</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Teléfono Celular</Form.Label>
            <Form.Control
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Confirmar Contraseña</Form.Label>
            <Form.Control
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setPasswordError("");
              }}
            />
            {passwordError && <div className="text-danger mt-1">{passwordError}</div>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Mostrar contraseñas"
              checked={showPassword}
              onChange={() => setShowPassword((prev) => !prev)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Es administrador"
              name="isAdmin"
              checked={formData.isAdmin}
              onChange={handleChange}
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={onHide} className="me-2">
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              Guardar
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalEditPaciente;