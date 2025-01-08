import React, { useState, useEffect } from "react";

const BasicStatistics = () => {
  const [statistics, setStatistics] = useState(null); // Estado para almacenar estadísticas
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(""); // Estado para errores

  // Cargar estadísticas del usuario al iniciar
  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users/1/statistics");
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
    <div className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">Estadísticas Básicas</h2>
      <ul className="space-y-4">
        <li>
          <span className="font-semibold">Número de Pronósticos:</span>{" "}
          {statistics.totalPicks}
        </li>
        <li>
          <span className="font-semibold">Stake Medio:</span> {statistics.averageStake}
        </li>
        <li>
          <span className="font-semibold">Cuota Media:</span> {statistics.averageOdds}
        </li>
        <li>
          <span className="font-semibold">% de Acierto:</span>{" "}
          {statistics.successRate}%
        </li>
        <li>
          <span className="font-semibold">Unidades Ganadas:</span>{" "}
          {statistics.unitsWon}
        </li>
        <li>
          <span className="font-semibold">Deportes:</span>{" "}
          {statistics.sports.join(", ")}
        </li>
      </ul>
    </div>
  );
};

export default BasicStatistics;
