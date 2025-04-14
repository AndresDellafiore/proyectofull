// CambioPasswordForm.js
import React, { useState } from "react";
import axios from "axios";

const CambioPasswordForm = ({ clientId, onClose }) => {
  const [nuevaPassword, setNuevaPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nuevaPassword !== confirmarPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    try {
      await axios.put(`http://localhost:5007/api/Client/ChangePassword`, {
        clientId,
        nuevaPassword
      });
      alert("Contraseña actualizada exitosamente.");
      onClose();
    } catch (error) {
      alert("Error al cambiar la contraseña.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Cambiar Contraseña</h3>
      <input
        type="password"
        placeholder="Nueva contraseña"
        value={nuevaPassword}
        onChange={(e) => setNuevaPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirmar contraseña"
        value={confirmarPassword}
        onChange={(e) => setConfirmarPassword(e.target.value)}
      />
      <button type="submit">Guardar</button>
      <button type="button" onClick={onClose}>Cancelar</button>
    </form>
  );
};

export default CambioPasswordForm;
