// src/services/patientService.js
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/global.css';

const API_URL = 'http://localhost:5263/api/Patients';

export const getPatients = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
