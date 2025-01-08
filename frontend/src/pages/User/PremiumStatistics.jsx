import React, { useState, useEffect } from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

// Registrar componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, ArcElement, Title, Tooltip, Legend);

const PremiumStatistics = () => {
  const [statistics, setStatistics] = useState(null); // Estadísticas del usuario
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(""); // Estado de error
  const [selectedFilter, setSelectedFilter] = useState("monthly"); // Filtro seleccionado (mensual, por deporte, etc.)

  useEffect(() => {
    // Simulación de datos reales del backend
    const fetchStatistics = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users/premium/statistics");
        if (!response.ok) {
          throw new Error("Error al cargar las estadísticas.");
        }
        const data = await response.json();
        setStatistics(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  // Configuración de datos para gráficos
  const chartData = (type) => {
    if (!statistics) return null;

    switch (type) {
      case "monthly":
        return {
          labels: statistics.months,
          datasets: [
            {
              label: "Unidades Ganadas",
              data: statistics.unitsWon,
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              tension: 0.4,
            },
            {
              label: "Unidades Perdidas",
              data: statistics.unitsLost,
              borderColor: "rgba(255, 99, 132, 1)",
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              tension: 0.4,
            },
          ],
        };

      case "sports":
        return {
          labels: statistics.sports.map((sport) => sport.name),
          datasets: [
            {
              label: "Unidades Ganadas",
              data: statistics.sports.map((sport) => sport.unitsWon),
              backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 99, 132, 0.6)", "rgba(54, 162, 235, 0.6)"],
              borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
              borderWidth: 1,
            },
          ],
        };

      case "odds":
        return {
          labels: statistics.oddsRanges.map((range) => range.range),
          datasets: [
            {
              label: "Picks",
              data: statistics.oddsRanges.map((range) => range.count),
              backgroundColor: "rgba(153, 102, 255, 0.6)",
              borderColor: "rgba(153, 102, 255, 1)",
              borderWidth: 1,
            },
          ],
        };

      default:
        return null;
    }
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text:
          selectedFilter === "monthly"
            ? "Estadísticas Mensuales"
            : selectedFilter === "sports"
            ? "Estadísticas por Deporte"
            : "Distribución por Cuotas",
      },
    },
  };

  // Exportar gráficos como imágenes
  const exportChartAsImage = async (chartId, filename) => {
    const chartElement = document.getElementById(chartId);
    if (!chartElement) {
      setError("No se encontró el gráfico para exportar.");
      return;
    }

    try {
      const canvas = await html2canvas(chartElement);
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setError("");
    } catch (err) {
      setError("Hubo un problema al exportar el gráfico como imagen.");
    }
  };

  if (loading) {
    return <p className="text-center">Cargando estadísticas...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!statistics) {
    return <p className="text-center">No hay estadísticas disponibles.</p>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Estadísticas Premium</h2>

      {/* Filtros */}
      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={() => setSelectedFilter("monthly")}
          className={`py-2 px-4 rounded-lg ${
            selectedFilter === "monthly"
              ? "bg-blue-600 text-white"
              : "bg-gray-300 text-gray-700 hover:bg-gray-400"
          }`}
        >
          Mensuales
        </button>
        <button
          onClick={() => setSelectedFilter("sports")}
          className={`py-2 px-4 rounded-lg ${
            selectedFilter === "sports"
              ? "bg-blue-600 text-white"
              : "bg-gray-300 text-gray-700 hover:bg-gray-400"
          }`}
        >
          Por Deporte
        </button>
        <button
          onClick={() => setSelectedFilter("odds")}
          className={`py-2 px-4 rounded-lg ${
            selectedFilter === "odds"
              ? "bg-blue-600 text-white"
              : "bg-gray-300 text-gray-700 hover:bg-gray-400"
          }`}
        >
          Por Cuotas
        </button>
      </div>

      {/* Gráficos */}
      <div id="chart-container" className="mb-6">
        {selectedFilter === "monthly" && (
          <div id="monthly-chart">
            <h3 className="text-lg font-bold mb-4">Gráfico Mensual</h3>
            <Line data={chartData("monthly")} options={chartOptions} />
          </div>
        )}

        {selectedFilter === "sports" && (
          <div id="sports-chart">
            <h3 className="text-lg font-bold mb-4">Gráfico por Deporte</h3>
            <Pie data={chartData("sports")} options={chartOptions} />
          </div>
        )}

        {selectedFilter === "odds" && (
          <div id="odds-chart">
            <h3 className="text-lg font-bold mb-4">Gráfico por Cuotas</h3>
            <Bar data={chartData("odds")} options={chartOptions} />
          </div>
        )}
      </div>

      {/* Botones de Exportación */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => exportChartAsImage("chart-container", "grafico.png")}
          className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Exportar Gráfico como Imagen
        </button>
      </div>
    </div>
  );
};

export default PremiumStatistics;
