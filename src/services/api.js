// src/services/api.js
import axios from 'axios';

const API_URL = "http://localhost:5007/api";  // Cambia la URL si es necesario

const api = axios.create({
  baseURL: API_URL,
});

// Crear cliente
export const createClient = async (clientData) => {
  const response = await api.post("/Client/New", clientData);
  return response.data;
};

// Agregar vehículo a un cliente
export const addVehicleToClient = async (clientId, vehicleData) => {
  const response = await api.post(`/Vehicle/AddToClient/${clientId}`, vehicleData);
  return response.data;
};

// Crear cuenta para cliente
export const createAccountForClient = async (clientId, accountData) => {
  const response = await api.post(`/Account/CreateForClient/${clientId}`, accountData);
  return response.data;
};

// Obtener todos los clientes
export const getAllClients = async () => {
  const response = await api.get("/Client/List");
  return response.data;
};

// Obtener balance de cuenta
export const getAccountBalance = async (clientId) => {
  const response = await api.get(`/Account/GetByClient/${clientId}`);
  return response.data;
};





