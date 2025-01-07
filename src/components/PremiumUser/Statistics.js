import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';

const Statistics = () => {
  const [statistics, setStatistics] = useState({});
  const [filters, setFilters] = useState({
    fromDate: '',
    toDate: ''
  });

  useEffect(() => {
    fetchStatistics();
  }, [filters]);

  const fetchStatistics = async () => {
    try {
      const response = await axios.get('/api/premiumUser/statistics', { params: filters });
      setStatistics(response.data);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const lineData = {
    labels: statistics.picks?.map(pick => new Date(pick.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Unidades',
        data: statistics.picks?.map(pick => pick.units),
        fill: false,
        backgroundColor: 'blue',
        borderColor: 'blue',
      },
    ],
  };

  const pieData = {
    labels: Object.keys(statistics.statuses || {}),
    datasets: [
      {
        data: Object.values(statistics.statuses || {}),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  return (
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="text-xl font-bold mb-2">Estadísticas de Pronósticos</h2>
      <div className="mb-4">
        <label className="block mb-2">
          Desde:
          <input type="date" name="fromDate" value={filters.fromDate} onChange={handleFilterChange} className="mt-1 block w-full border-gray-300 rounded-lg" />
        </label>
        <label className="block mb-2">
          Hasta:
          <input type="date" name="toDate" value={filters.toDate} onChange={handleFilterChange} className="mt-1 block w-full border-gray-300 rounded-lg" />
        </label>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-bold mb-2">Gráfico Unidades/Tiempo</h3>
        <Line data={lineData} />
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-bold mb-2">Gráfico Circular por Estado</h3>
        <Pie data={pieData} />
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-bold mb-2">Resumen de Estadísticas</h3>
        <div className="mb-2">Número de Pronósticos: {statistics.numberOfPredictions}</div>
        <div className="mb-2">Stake Medio: {statistics.averageStake}</div>
        <div className="mb-2">Cuota Media: {statistics.averageOdds}</div>
        <div className="mb-2">% de Acierto: {statistics.winPercentage}%</div>
        <div className="mb-2">Unidades Ganadas: {statistics.totalUnitsWon}</div>
        <div className="mb-2">Deportes: {statistics.sports?.join(', ')}</div>
      </div>
    </div>
  );
};

export default Statistics;
