// src/components/Navbar.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

const AppNavbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Navbar bg="light" expand="lg" className="navbar-custom">
      <Container>
        <Navbar.Brand onClick={() => navigate("/")} style={{ cursor: 'pointer' }}>
          VesNutrición
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            {user?.isAdmin ? (
              <>
                <Nav.Link onClick={() => navigate("/pacientes")}>Pacientes</Nav.Link>
                <Nav.Link onClick={() => navigate("/turnos")}>Turnos</Nav.Link>
              </>
            ) : user ? (
              <Nav.Link onClick={() => navigate("/turnos")}>Solicitar Turno</Nav.Link>
            ) : null}
          </Nav>
          {user && (
            <Button variant="outline-success" onClick={handleLogout}>
              Cerrar sesión
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;

