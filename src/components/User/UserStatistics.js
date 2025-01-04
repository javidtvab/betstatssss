import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserStatistics = () => {
  const [statistics, setStatistics] = useState({});

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      const response = await axios.get('/api/user/statistics');
      setStatistics(response.data);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-4 mt-4">
      <h2 className="text-xl font-bold mb-2">Estadísticas Básicas</h2>
      <div className="mb-2">Número de Pronósticos: {statistics.numberOfPredictions}</div>
      <div className="mb-2">Stake Medio: {statistics.averageStake}</div>
      <div className="mb-2">Cuota Media: {statistics.averageOdds}</div>
      <div className="mb-2">% de Acierto: {statistics.winPercentage}%</div>
      <div className="mb-2">Unidades Ganadas: {statistics.totalUnitsWon}</div>
      <div className="mb-2">Deportes: {statistics.sports?.join(', ')}</div>
    </div>
  );
};

export default UserStatistics;
