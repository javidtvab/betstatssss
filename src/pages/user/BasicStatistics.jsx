import React from "react";

const BasicStatistics = ({ statistics }) => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">Estadísticas Básicas</h2>
      <ul className="mt-4">
        <li>Número de Pronósticos: {statistics.totalPicks}</li>
        <li>Stake Medio: {statistics.averageStake}</li>
        <li>Cuota Media: {statistics.averageOdds}</li>
        <li>% de Acierto: {statistics.successRate}%</li>
        <li>Unidades Ganadas: {statistics.unitsWon}</li>
        <li>Deportes: {statistics.sports.join(", ")}</li>
      </ul>
    </div>
  );
};

export default BasicStatistics;
