import React, { useState, useEffect } from "react";
import { Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend } from "chart.js";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

// Registrar componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [metrics, setMetrics] = useState(null); // Métricas generales
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(""); // Estado de error
  const [alerts, setAlerts] = useState([]); // Notificaciones de cambios significativos

  useEffect(() => {
    // Cargar métricas desde el backend
    const fetchMetrics = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/admin/dashboard");
        if (!response.ok) {
          throw new Error("Error al cargar las métricas.");
        }
        const data = await response.json();

        setMetrics(data);

        // Generar alertas automáticas
        generateAlerts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  // Generar alertas dinámicas basadas en las métricas clave
  const generateAlerts = (data) => {
    const significantChanges = [];

    // Usuarios Activos
    if (data.userActivity.growth < -10) {
      significantChanges.push("La actividad de usuarios ha disminuido más del 10% este mes.");
    } else if (data.userActivity.growth > 20) {
      significantChanges.push("La actividad de usuarios ha aumentado más del 20% este mes.");
    }

    // Ingresos Totales
    if (data.totalRevenueGrowth < -5) {
      significantChanges.push("Los ingresos totales han disminuido más del 5% este mes.");
    } else if (data.totalRevenueGrowth > 15) {
      significantChanges.push("Los ingresos totales han crecido más del 15% este mes.");
    }

    // Suscripciones
    if (data.activeSubscriptionsGrowth < -8) {
      significantChanges.push("El número de suscripciones activas ha disminuido más del 8% este mes.");
    } else if (data.activeSubscriptionsGrowth > 10) {
      significantChanges.push("El número de suscripciones activas ha crecido más del 10% este mes.");
    }

    setAlerts(significantChanges);
  };

  if (loading) {
    return <p className="text-center">Cargando métricas...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!metrics) {
    return <p className="text-center">No hay métricas disponibles.</p>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Panel de Administración</h2>

      {/* Notificaciones */}
      {alerts.length > 0 && (
        <div className="mb-6 bg-yellow-100 p-4 rounded-lg">
          <h3 className="text-lg font-bold mb-2">Notificaciones</h3>
          <ul className="list-disc pl-6">
            {alerts.map((alert, index) => (
              <li key={index}>{alert}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Resumen General */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-blue-100 p-4 rounded-lg text-center">
          <h3 className="text-lg font-bold">Usuarios Totales</h3>
          <p className="text-2xl font-semibold">{metrics.totalUsers}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg text-center">
          <h3 className="text-lg font-bold">Suscripciones Activas</h3>
          <p className="text-2xl font-semibold">{metrics.activeSubscriptions}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg text-center">
          <h3 className="text-lg font-bold">Total de Ingresos</h3>
          <p className="text-2xl font-semibold">${metrics.totalRevenue.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
