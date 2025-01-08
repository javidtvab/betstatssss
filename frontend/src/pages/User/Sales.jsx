import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Registrar componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Sales = () => {
  const [salesData, setSalesData] = useState(null); // Datos de ventas
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(""); // Estado de error
  const [selectedFilter, setSelectedFilter] = useState("subscriptions"); // Filtro seleccionado
  const [dateFilter, setDateFilter] = useState({ start: "", end: "" }); // Filtros de rango de fechas

  useEffect(() => {
    // Simulación de datos desde el backend
    const fetchSalesData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users/premium/sales");
        if (!response.ok) {
          throw new Error("Error al cargar los datos de ventas.");
        }
        const data = await response.json();
        setSalesData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSalesData();
  }, []);

  const applyDateFilter = (sales) => {
    if (!dateFilter.start || !dateFilter.end) {
      return sales;
    }

    const startDate = new Date(dateFilter.start);
    const endDate = new Date(dateFilter.end);

    return sales.filter((sale) => {
      const saleDate = new Date(sale.startDate || sale.date);
      return saleDate >= startDate && saleDate <= endDate;
    });
  };

  // Configuración del gráfico
  const chartData = () => {
    if (!salesData) return null;

    const filteredSales =
      selectedFilter === "subscriptions"
        ? applyDateFilter(salesData.subscriptions)
        : applyDateFilter(salesData.picks);

    const labels = filteredSales.map((sale) => sale.user);
    const amounts = filteredSales.map((sale) => sale.amount);

    return {
      labels,
      datasets: [
        {
          label: "Importe",
          data: amounts,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };
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
          selectedFilter === "subscriptions"
            ? "Ingresos por Suscripciones"
            : "Ingresos por Picks",
      },
    },
  };

  if (loading) {
    return <p className="text-center">Cargando datos de ventas...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!salesData) {
    return <p className="text-center">No hay datos de ventas disponibles.</p>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Gestión de Ventas</h2>

      {/* Filtros de Fecha */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-2">Filtrar por Fecha</h3>
        <div className="flex space-x-4">
          <input
            type="date"
            value={dateFilter.start}
            onChange={(e) => setDateFilter({ ...dateFilter, start: e.target.value })}
            className="p-2 border border-gray-300 rounded-md"
          />
          <input
            type="date"
            value={dateFilter.end}
            onChange={(e) => setDateFilter({ ...dateFilter, end: e.target.value })}
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      {/* Filtros de Categoría */}
      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={() => setSelectedFilter("subscriptions")}
          className={`py-2 px-4 rounded-lg ${
            selectedFilter === "subscriptions"
              ? "bg-blue-600 text-white"
              : "bg-gray-300 text-gray-700 hover:bg-gray-400"
          }`}
        >
          Suscripciones
        </button>
        <button
          onClick={() => setSelectedFilter("picks")}
          className={`py-2 px-4 rounded-lg ${
            selectedFilter === "picks"
              ? "bg-blue-600 text-white"
              : "bg-gray-300 text-gray-700 hover:bg-gray-400"
          }`}
        >
          Picks Vendidos
        </button>
      </div>

      {/* Tabla de Datos */}
      <div className="bg-gray-100 p-4 rounded-lg">
        {selectedFilter === "subscriptions" && (
          <>
            <h3 className="text-lg font-bold mb-4">Suscripciones Vendidas</h3>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="border-b py-2">Usuario</th>
                  <th className="border-b py-2">Fecha Inicio</th>
                  <th className="border-b py-2">Fecha Fin</th>
                  <th className="border-b py-2">Importe</th>
                </tr>
              </thead>
              <tbody>
                {applyDateFilter(salesData.subscriptions).map((sub, index) => (
                  <tr key={index}>
                    <td className="border-b py-2">{sub.user}</td>
                    <td className="border-b py-2">{sub.startDate}</td>
                    <td className="border-b py-2">{sub.endDate}</td>
                    <td className="border-b py-2">${sub.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {selectedFilter === "picks" && (
          <>
            <h3 className="text-lg font-bold mb-4">Picks Vendidos</h3>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="border-b py-2">Usuario</th>
                  <th className="border-b py-2">Evento</th>
                  <th className="border-b py-2">Cuota</th>
                  <th className="border-b py-2">Importe</th>
                </tr>
              </thead>
              <tbody>
                {applyDateFilter(salesData.picks).map((pick, index) => (
                  <tr key={index}>
                    <td className="border-b py-2">{pick.user}</td>
                    <td className="border-b py-2">{pick.event}</td>
                    <td className="border-b py-2">{pick.odds}</td>
                    <td className="border-b py-2">${pick.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>

      {/* Gráficos */}
      <div className="mt-6 bg-gray-100 p-4 rounded-lg">
        <h3 className="text-lg font-bold mb-4">Gráfico de Ventas</h3>
        <Bar data={chartData()} options={chartOptions} />
      </div>
    </div>
  );
};

export default Sales;
