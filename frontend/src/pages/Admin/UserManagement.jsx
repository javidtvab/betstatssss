import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

// Registrar componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [userType, setUserType] = useState("all");
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userStats, setUserStats] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/admin/users");
        if (!response.ok) {
          throw new Error("Error al cargar los usuarios.");
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const fetchUserStats = async (userId) => {
    try {
      setUserStats(null);
      const response = await fetch(`http://localhost:5000/api/admin/users/${userId}/stats`);
      if (!response.ok) {
        throw new Error("Error al cargar las estadísticas del usuario.");
      }
      const data = await response.json();
      setUserStats(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const exportChartAsImage = async () => {
    const chartElement = document.getElementById("performance-chart");
    if (!chartElement) {
      setError("No se encontró el gráfico para exportar.");
      return;
    }

    try {
      const canvas = await html2canvas(chartElement);
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "grafico_rendimiento.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      setError("Hubo un problema al exportar el gráfico como imagen.");
    }
  };

  const exportChartAsPDF = async () => {
    const chartElement = document.getElementById("performance-chart");
    if (!chartElement) {
      setError("No se encontró el gráfico para exportar.");
      return;
    }

    try {
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text("Gráfico de Rendimiento del Usuario", 14, 20);

      const canvas = await html2canvas(chartElement);
      const imgData = canvas.toDataURL("image/png");

      doc.addImage(imgData, "PNG", 10, 30, 190, 100);
      doc.save("grafico_rendimiento.pdf");
    } catch (err) {
      setError("Hubo un problema al exportar el gráfico como PDF.");
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch = searchQuery === "" || user.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "all" || user.status === filter;
    const matchesType = userType === "all" || user.type === userType;
    return matchesSearch && matchesFilter && matchesType;
  });

  const paginatedUsers = filteredUsers.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handlePageChange = (direction) => {
    if (direction === "next" && page < Math.ceil(filteredUsers.length / itemsPerPage)) {
      setPage(page + 1);
    } else if (direction === "prev" && page > 1) {
      setPage(page - 1);
    }
  };

  if (loading) {
    return <p className="text-center">Cargando usuarios...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Gestión de Usuarios</h2>

      {/* Tabla de Usuarios */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr>
              <th className="border-b py-2 px-4">Nombre</th>
              <th className="border-b py-2 px-4">Email</th>
              <th className="border-b py-2 px-4">Estado</th>
              <th className="border-b py-2 px-4">Tipo</th>
              <th className="border-b py-2 px-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user) => (
              <tr key={user.id}>
                <td className="border-b py-2 px-4">{user.name}</td>
                <td className="border-b py-2 px-4">{user.email}</td>
                <td className="border-b py-2 px-4">{user.status === "active" ? "Activo" : "Bloqueado"}</td>
                <td className="border-b py-2 px-4">{user.type || "N/A"}</td>
                <td className="border-b py-2 px-4">
                  <button
                    onClick={() => {
                      setSelectedUser(user);
                      fetchUserStats(user.id);
                    }}
                    className="py-1 px-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Ver Detalles
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detalles del Usuario y Estadísticas */}
      {selectedUser && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-bold mb-4">Detalles del Usuario</h3>
          <p>
            <strong>Nombre:</strong> {selectedUser.name}
          </p>
          <p>
            <strong>Email:</strong> {selectedUser.email}
          </p>

          {userStats ? (
            <div className="mt-4">
              <h4 className="text-md font-bold mb-2">Estadísticas</h4>
              <p>
                <strong>Picks Totales:</strong> {userStats.totalPicks}
              </p>
              <p>
                <strong>ROI (%):</strong> {userStats.roi}
              </p>
              <p>
                <strong>Unidades Ganadas:</strong> {userStats.unitsWon}
              </p>
              <div id="performance-chart" className="mt-6">
                <Line
                  data={{
                    labels: userStats.performance.months,
                    datasets: [
                      {
                        label: "Unidades Ganadas",
                        data: userStats.performance.unitsWon,
                        borderColor: "rgba(75, 192, 192, 1)",
                        backgroundColor: "rgba(75, 192, 192, 0.2)",
                        tension: 0.4,
                      },
                      {
                        label: "ROI (%)",
                        data: userStats.performance.roi,
                        borderColor: "rgba(255, 99, 132, 1)",
                        backgroundColor: "rgba(255, 99, 132, 0.2)",
                        tension: 0.4,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: "top",
                      },
                      title: {
                        display: true,
                        text: "Evolución del Rendimiento",
                      },
                    },
                  }}
                />
              </div>
              <div className="flex space-x-4 mt-4">
                <button
                  onClick={exportChartAsImage}
                  className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Exportar como Imagen
                </button>
                <button
                  onClick={exportChartAsPDF}
                  className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Exportar como PDF
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">Cargando estadísticas...</p>
          )}
          <button
            onClick={() => setSelectedUser(null)}
            class
            "mt-4 py-2 px-4 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
          >
            Cerrar
          </button>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
