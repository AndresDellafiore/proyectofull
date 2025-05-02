import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("user"); // o tu forma de validar
    if (!isAuthenticated) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <div className="container">
      <h2>Dashboard</h2>
      {/* contenido */}
    </div>
  );
};

export default Dashboard;