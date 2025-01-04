import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Picks = () => {
  const [picks, setPicks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchPicks();
  }, []);

  const fetchPicks = async () => {
    try {
      const response = await axios.get('/admin/picks');
      setPicks(response.data);
    } catch (error) {
      console.error('Error fetching picks:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/admin/picks/search/${searchQuery}`);
      setPicks(response.data);
    } catch (error) {
      console.error('Error searching picks:', error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="text-xl font-bold mb-2">Buscar Picks</h2>
      <div className="mb-4">
        <input 
          type="text" 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
          className="mt-1 block w-full" 
          placeholder="Buscar por descripción" 
        />
        <button onClick={handleSearch} className="mt-2 bg-blue-500 text-white py-2 px-4 rounded">Buscar</button>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Descripción</th>
            <th className="py-2">Usuario</th>
            <th className="py-2">Stake</th>
            <th className="py-2">Cuota</th>
            <th className="py-2">Estado</th>
            <th className="py-2">Unidades</th>
            <th className="py-2">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {picks.map(pick => (
            <tr key={pick._id}>
              <td className="py-2">{pick.description}</td>
              <td className="py-2">{pick.userId.username}</td>
              <td className="py-2">{pick.stake}</td>
              <td className="py-2">{pick.odds}</td>
              <td className="py-2">{pick.status}</td>
              <td className="py-2">{pick.units}</td>
              <td className="py-2">{new Date(pick.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Picks;
