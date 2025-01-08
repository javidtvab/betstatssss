import React from "react";
import PieChart from "./PieChart";

const PieChartDemo = () => {
  const chartData = {
    labels: ["Acertados", "Fallados", "Nulos", "Pendientes"],
    datasets: [
      {
        label: "Estados de Picks",
        data: [45, 20, 15, 10], // Datos para cada estado
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)", // Acertados
          "rgba(255, 99, 132, 0.6)", // Fallados
          "rgba(255, 206, 86, 0.6)", // Nulos
          "rgba(54, 162, 235, 0.6)", // Pendientes
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(54, 162, 235, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Distribución de Estados de Picks",
      },
    },
  };

  return (
    <div className="p-4">
      <PieChart data={chartData} options={chartOptions} />
    </div>
  );
};

export default PieChartDemo;
