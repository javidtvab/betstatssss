import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SelfVerifiedPicks = () => {
  const [picks, setPicks] = useState([]);
  const [selectedPick, setSelectedPick] = useState(null);
  const [units, setUnits] = useState('');

  useEffect(() => {
    fetchPicks();
  }, []);

  const fetchPicks = async () => {
    try {
      const response = await axios.get('/admin/self-verified-picks');
      setPicks(response.data);
    } catch (error) {
      console.error('Error fetching self-verified picks:', error);
    }
  };

  const handleUpdatePick = async (id, status, manualUnits) => {
    try {
      const data = { status };
      if (manualUnits !== undefined) {
        data.units = manualUnits;
      }
      await axios.put(`/admin/self-verified-picks/${id}`, data);
      fetchPicks();
    } catch (error) {
      console.error('Error updating pick:', error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="text-xl font-bold mb-2">Control de Picks Autoverificados</h2>
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
            <th className="py-2">Acciones</th>
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
              <td className="py-2">
                <button onClick={() => setSelectedPick(pick)} className="text-blue-500 ml-4">Modificar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedPick && (
        <div className="mt-4">
          <h3 className="text-lg font-bold">Modificar Pick Autoverificado</h3>
          <form onSubmit={(e) => {
            e.preventDefault();
            handleUpdatePick(selectedPick._id, selectedPick.status, units ? parseFloat(units) : undefined);
            setSelectedPick(null);
            setUnits('');
          }}>
            <label className="block mt-2">
              Estado:
              <select value={selectedPick.status} onChange={(e) => setSelectedPick({ ...selectedPick, status: e.target.value })} className="mt-1 block w-full">
                <option value="won">Acertado</option>
                <option value="lost">Fallado</option>
                <option value="void">Nulo</option>
                <option value="cancelled">Anulado</option>
                <option value="closed">Cerrado</option>
              </select>
            </label>
            {(selectedPick.status === 'won' || selectedPick.status === 'closed') && (
              <label className="block mt-2">
                Unidades:
                <input type="number" value={units} onChange={(e) => setUnits(e.target.value)} className="mt-1 block w-full" />
              </label>
            )}
            <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Guardar Cambios</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SelfVerifiedPicks;
