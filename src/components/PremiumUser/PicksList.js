import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PicksList = () => {
  const [picks, setPicks] = useState([]);
  const [filters, setFilters] = useState({
    status: '',
    sport: '',
    fromDate: '',
    toDate: ''
  });

  useEffect(() => {
    fetchPicks();
  }, [filters]);

  const fetchPicks = async () => {
    try {
      const response = await axios.get('/api/premiumUser/picks', { params: filters });
      setPicks(response.data);
    } catch (error) {
      console.error('Error fetching picks:', error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  return (
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="text-xl font-bold mb-2">Listado de Picks</h2>
      <div className="mb-4">
        <label className="block mb-2">
          Estado:
          <select name="status" value={filters.status} onChange={handleFilterChange} className="mt-1 block w-full border-gray-300 rounded-lg">
            <option value="">Todos</option>
            <option value="pending">Pendiente</option>
            <option value="won">Acertado</option>
            <option value="lost">Fallado</option>
            <option value="void">Anulado</option>
            <option value="null">Nulo</option>
            <option value="closed">Cerrado</option>
          </select>
        </label>
        <label className="block mb-2">
          Deporte:
          <input type="text" name="sport" value={filters.sport} onChange={handleFilterChange} className="mt-1 block w-full border-gray-300 rounded-lg" />
        </label>
        <label className="block mb-2">
          Desde:
          <input type="date" name="fromDate" value={filters.fromDate} onChange={handleFilterChange} className="mt-1 block w-full border-gray-300 rounded-lg" />
        </label>
        <label className="block mb-2">
          Hasta:
          <input type="date" name="toDate" value={filters.toDate} onChange={handleFilterChange} className="mt-1 block w-full border-gray-300 rounded-lg" />
        </label>
      </div>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PicksList;
