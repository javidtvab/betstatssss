import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { jsPDF } from "jspdf";

// Registrar componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const PremiumProfile = () => {
  const [profile, setProfile] = useState({
    nickname: "",
    profilePhoto: null,
    previewPhoto: null,
    twitter: "",
    facebook: "",
    instagram: "",
    telegram: "",
    description: "",
  });

  const [statistics, setStatistics] = useState(null); // Estadísticas del usuario
  const [loading, setLoading] = useState(true); // Estado de carga
  const [processing, setProcessing] = useState(false); // Estado de procesamiento de exportaciones
  const [success, setSuccess] = useState(""); // Mensaje de éxito
  const [error, setError] = useState(""); // Mensaje de error
  const [socialError, setSocialError] = useState(""); // Error en las redes sociales

  // Cargar datos del perfil y estadísticas al montar el componente
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users/premium");
        if (!response.ok) {
          throw new Error("Error al cargar los datos del perfil.");
        }
        const data = await response.json();
        setProfile({
          nickname: data.nickname,
          previewPhoto: data.profilePhoto,
          twitter: data.twitter,
          facebook: data.facebook,
          instagram: data.instagram,
          telegram: data.telegram,
          description: data.description,
        });
        setStatistics(data.statistics);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  // Exportar estadísticas como CSV
  const exportToCSV = () => {
    if (!statistics) {
      setError("No hay estadísticas disponibles para exportar.");
      return;
    }

    setProcessing(true);
    const rows = [["Mes", "Unidades Ganadas", "Unidades Perdidas", "ROI"]];
    statistics.months.forEach((month, index) => {
      rows.push([
        month,
        statistics.unitsWon[index],
        statistics.unitsLost[index],
        statistics.roi[index],
      ]);
    });

    const csvContent =
      "data:text/csv;charset=utf-8," +
      rows.map((row) => row.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "estadisticas_premium.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setSuccess("Estadísticas exportadas como CSV.");
    setProcessing(false);
  };

  // Exportar estadísticas como PDF
  const exportToPDF = async () => {
    if (!statistics) {
      setError("No hay estadísticas disponibles para exportar.");
      return;
    }

    setProcessing(true);
    try {
      const doc = new jsPDF();

      doc.setFontSize(18);
      doc.text("Estadísticas Premium", 14, 20);

      doc.setFontSize(12);
      doc.text("Resumen Mensual", 14, 30);

      statistics.months.forEach((month, index) => {
        doc.text(
          `${month}: Unidades Ganadas: ${statistics.unitsWon[index]}, Unidades Perdidas: ${statistics.unitsLost[index]}, ROI: ${statistics.roi[index]}%`,
          14,
          40 + index * 10
        );
      });

      doc.save("estadisticas_premium.pdf");
      setSuccess("Estadísticas exportadas como PDF.");
    } catch (err) {
      setError("Hubo un error al generar el PDF.");
    } finally {
      setProcessing(false);
    }
  };

  // Configuración de datos del gráfico
  const chartData = statistics
    ? {
        labels: statistics.months, // Ejemplo: ["Enero", "Febrero", "Marzo"]
        datasets: [
          {
            label: "Unidades Ganadas",
            data: statistics.unitsWon, // Ejemplo: [5, 10, 15]
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            tension: 0.4,
            yAxisID: "y",
          },
          {
            label: "Unidades Perdidas",
            data: statistics.unitsLost, // Ejemplo: [-2, -5, -3]
            borderColor: "rgba(255, 99, 132, 1)",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            tension: 0.4,
            yAxisID: "y",
          },
          {
            label: "ROI (%)",
            data: statistics.roi, // Ejemplo: [10, 15, 20]
            borderColor: "rgba(54, 162, 235, 1)",
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            tension: 0.4,
            yAxisID: "y1",
          },
        ],
      }
    : null;

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Rendimiento Mensual",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Unidades",
        },
      },
      y1: {
        beginAtZero: true,
        position: "right",
        title: {
          display: true,
          text: "ROI (%)",
        },
      },
    },
  };

  if (loading) {
    return <p className="text-center">Cargando datos del perfil...</p>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Configuración de Perfil Premium</h2>
      {success && <p className="text-sm text-green-500 mb-4">{success}</p>}
      {error && <p className="text-sm text-red-500 mb-4">{error}</p>}
      {processing && <p className="text-sm text-blue-500 mb-4">Procesando exportación...</p>}

      {/* Gráfico de Estadísticas */}
      {statistics && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-bold mb-4">Estadísticas Avanzadas</h3>
          <Line data={chartData} options={chartOptions} />
          <div className="mt-4 flex space-x-4">
            <button
              onClick={exportToCSV}
              disabled={processing}
              className={`py-2 px-4 rounded-lg ${
                processing ? "bg-gray-300 text-gray-500" : "bg-green-500 text-white hover:bg-green-600"
              }`}
            >
              Exportar CSV
            </button>
            <button
              onClick={exportToPDF}
              disabled={processing}
              className={`py-2 px-4 rounded-lg ${
                processing ? "bg-gray-300 text-gray-500" : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Exportar PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PremiumProfile;
