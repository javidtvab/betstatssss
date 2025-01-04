import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PicksList = () => {
  const [picks, setPicks] = useState([]);

  useEffect(() => {
    fetchPicks();
  }, []);

  const fetchPicks = async () => {
    try {
      const response = await axios.get('/api/user/picks');
      setPicks(response.data);
    } catch (error) {
      console.error('Error fetching picks:', error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="text-xl font-bold mb-2">Listado de Picks</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Descripción</th>
            <th className="py-2">Stake</th>
            <th className="py-2">Cuota</th>
            <th className="py-2">Estado</th>
            <th className="py-2">Deporte</th>
            <th className="py-2">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {picks.map(pick => (
            <tr key={pick._id}>
              <td className="py-2">{pick.description}</td>
              <td className="py-2">{pick.stake}</td>
              <td className="py-2">{pick.odds}</td>
              <td className="py-2">{pick.status}</td>
              <td className="py-2">{pick.sport}</td>
              <td className="py-2">{new Date(pick.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PicksList;
