import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PendingPicks = () => {
  const [picks, setPicks] = useState([]);

  useEffect(() => {
    fetchPendingPicks();
  }, []);

  const fetchPendingPicks = async () => {
    try {
      const response = await axios.get('/api/user/picks/pending');
      setPicks(response.data);
    } catch (error) {
      console.error('Error fetching pending picks:', error);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await axios.put(`/api/user/picks/${id}/status`, { status });
      fetchPendingPicks(); // Refrescar la lista después de actualizar el estado
    } catch (error) {
      console.error('Error updating pick status:', error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="text-xl font-bold mb-2">Picks Pendientes de Verificación</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Descripción</th>
            <th className="py-2">Stake</th>
            <th className="py-2">Cuota</th>
            <th className="py-2">Deporte</th>
            <th className="py-2">Fecha</th>
            <th className="py-2">Acciones</th>
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
              <td className="py-2">
                <button onClick={() => handleUpdateStatus(pick._id, 'acertado')} className="text-green-500 ml-4">Acertado</button>
                <button onClick={() => handleUpdateStatus(pick._id, 'fallado')} className="text-red-500 ml-4">Fallado</button>
                <button onClick={() => handleUpdateStatus(pick._id, 'anulado')} className="text-yellow-500 ml-4">Anulado</button>
                <button onClick={() => handleUpdateStatus(pick._id, 'nulo')} className="text-gray-500 ml-4">Nulo</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PendingPicks;
