import React from 'react';
import ReactDOM from 'react-dom/client'; // 👈 Importa desde 'react-dom/client'
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // ← este activa funcionalidades como tabs

const root = ReactDOM.createRoot(document.getElementById('root')); // 👈 crea el "root"
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);