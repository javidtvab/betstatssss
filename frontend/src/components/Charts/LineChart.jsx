import React from "react";
import LineChart from "./LineChart";

const LineChartDemo = () => {
  const chartData = {
    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"],
    datasets: [
      {
        label: "Unidades Ganadas",
        data: [3, 2, 5, 8, 6, 10],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4, // Suaviza las líneas
      },
      {
        label: "Unidades Perdidas",
        data: [-2, -1, -3, -4, -2, -5],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.4,
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
        text: "Rendimiento Mensual",
      },
    },
  };

  return (
    <div className="p-4">
      <LineChart data={chartData} options={chartOptions} />
    </div>
  );
};

export default LineChartDemo;
