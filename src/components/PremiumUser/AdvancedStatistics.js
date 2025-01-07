import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line, Pie, Bar } from 'react-chartjs-2';
import html2canvas from 'html2canvas';

const AdvancedStatistics = () => {
  const [picks, setPicks] = useState([]);
  const [monthlyUnits, setMonthlyUnits] = useState([]);
  const [sportsStats, setSportsStats] = useState([]);
  const [bookiesStats, setBookiesStats] = useState([]);
  const [leaguesStats, setLeaguesStats] = useState([]);
  const [oddsRangeStats, setOddsRangeStats] = useState([]);
  const [filters, setFilters] = useState({
    fromDate: '',
    toDate: '',
    sport: '',
    bookie: '',
    league: '',
    oddsRange: ''
  });

  useEffect(() => {
    fetchAdvancedStatistics();
  }, [filters]);

  const fetchAdvancedStatistics = async () => {
    try {
      const response = await axios.get('/api/premiumUser/advanced-statistics', { params: filters });
      setPicks(response.data.picks);
      setMonthlyUnits(response.data.monthlyUnits);
      setSportsStats(response.data.sportsStats);
      setBookiesStats(response.data.bookiesStats);
      setLeaguesStats(response.data.leaguesStats);
      setOddsRangeStats(response.data.oddsRangeStats);
    } catch (error) {
      console.error('Error fetching advanced statistics:', error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const handleShare = () => {
    const element = document.getElementById('statistics-content');
    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = 'statistics.png';
      link.click();
    });
  };

  return (
    <div className="bg-white shadow-md rounded p-4" id="statistics-content">
      <h2 className="text-xl font-bold mb-2">Estadísticas Avanzadas</h2>
      <div className="mb-4">
        <label className="block mb-2">
          Desde:
          <input type="date" name="fromDate" value={filters.fromDate} onChange={handleFilterChange} className="mt-1 block w-full border-gray-300 rounded-lg" />
        </label>
        <label className="block mb-2">
          Hasta:
          <input type="date" name="toDate" value={filters.toDate} onChange={handleFilterChange} className="mt-1 block w-full border-gray-300 rounded-lg" />
        </label>
        <label className="block mb-2">
          Deporte:
          <input type="text" name="sport" value={filters.sport} onChange={handleFilterChange} className="mt-1 block w-full border-gray-300 rounded-lg" />
        </label>
        <label className="block mb-2">
          Casa de Apuestas:
          <input type="text" name="bookie" value={filters.bookie} onChange={handleFilterChange} className="mt-1 block w-full border-gray-300 rounded-lg" />
        </label>
        <label className="block mb-2">
          Liga:
          <input type="text" name="league" value={filters.league} onChange={handleFilterChange} className="mt-1 block w-full border-gray-300 rounded-lg" />
        </label>
        <label className="block mb-2">
          Rango de Cuotas:
          <input type="text" name="oddsRange" value={filters.oddsRange} onChange={handleFilterChange} className="mt-1 block w-full border-gray-300 rounded-lg" placeholder="Ej. 1.5-2.0" />
        </label>
      </div>

      <button onClick={handleShare} className="mb-4 bg-blue-500 text-white py-2 px-4 rounded">Compartir Estadísticas</button>

      <h3 className="text-lg font-bold mb-2">Listado de Picks</h3>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Descripción</th>
            <th className="py-2">Stake</th>
            <th className="py-2">Cuota</th>
            <th className="py-2">Deporte</th>
            <th className="py-2">Fecha</th>
            <th className="py-2">Estado</th>
            <th className="py-2">Unidades</th>
            <th className="py-2">Casa de Apuestas</th>
            <th className="py-2">Liga</th>
          </tr>
        </thead>
        <tbody>
          {picks.map(pick => (
            <tr key={pick._id}>
              <td className="py-2">{pick.description}</td>
              <td className="py-2">{pick.stake}</td>
              <td className="py-2">{pick.odds}</td>
              <td className="py-2">{pick.sport}</td>
              <td className="py-2">{new Date(pick.date).toLocaleDateString()}</td>
              <td className="py-2">{pick.status}</td>
              <td className="py-2">{pick.units}</td>
              <td className="py-2">{pick.bookie}</td>
              <td className="py-2">{pick.league}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 className="text-lg font-bold mb-2">Unidades Ganadas Mensualmente</h3>
      <Line data={monthlyUnits} />

      <h3 className="text-lg font-bold mb-2">Estadísticas por Deporte</h3>
      <Bar data={sportsStats} />

      <h3 className="text-lg font-bold mb-2">Estadísticas por Casa de Apuestas</h3>
      <Bar data={bookiesStats} />

      <h3 className="text-lg font-bold mb-2">Estadísticas por Liga/Competición</h3>
      <Bar data={leaguesStats} />

      <h3 className="text-lg font-bold mb-2">Estadísticas por Rango de Cuotas</h3>
      <Bar data={oddsRangeStats} />
    </div>
  );
};

export default AdvancedStatistics;
