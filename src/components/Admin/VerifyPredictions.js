import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VerifyPredictions = () => {
  const [predictions, setPredictions] = useState([]);
  const [selectedPrediction, setSelectedPrediction] = useState(null);
  const [units, setUnits] = useState('');

  useEffect(() => {
    fetchPredictions();
  }, []);

  const fetchPredictions = async () => {
    try {
      const response = await axios.get('/admin/predictions/verified');
      setPredictions(response.data);
    } catch (error) {
      console.error('Error fetching predictions:', error);
    }
  };

  const handleVerifyPrediction = async (id, status, manualUnits) => {
    try {
      const data = { status };
      if (manualUnits !== undefined) {
        data.units = manualUnits;
      }
      await axios.put(`/admin/predictions/verify/${id}`, data);
      fetchPredictions();
    } catch (error) {
      console.error('Error verifying prediction:', error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="text-xl font-bold mb-2">Verificación de Pronósticos</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Descripción</th>
            <th className="py-2">Usuario</th>
            <th className="py-2">Stake</th>
            <th className="py-2">Cuota</th>
            <th className="py-2">Estado</th>
            <th className="py-2">Unidades</th>
            <th className="py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {predictions.map(prediction => (
            <tr key={prediction._id}>
              <td className="py-2">{prediction.description}</td>
              <td className="py-2">{prediction.userId.username}</td>
              <td className="py-2">{prediction.stake}</td>
              <td className="py-2">{prediction.odds}</td>
              <td className="py-2">{prediction.status}</td>
              <td className="py-2">{prediction.units}</td>
              <td className="py-2">
                <button onClick={() => setSelectedPrediction(prediction)} className="text-blue-500 ml-4">Verificar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedPrediction && (
        <div className="mt-4">
          <h3 className="text-lg font-bold">Verificar Pronóstico</h3>
          <form onSubmit={(e) => {
            e.preventDefault();
            handleVerifyPrediction(selectedPrediction._id, selectedPrediction.status, units ? parseFloat(units) : undefined);
            setSelectedPrediction(null);
            setUnits('');
          }}>
            <label className="block mt-2">
              Estado:
              <select value={selectedPrediction.status} onChange={(e) => setSelectedPrediction({ ...selectedPrediction, status: e.target.value })} className="mt-1 block w-full">
                <option value="won">Acertado</option>
                <option value="lost">Fallado</option>
                <option value="void">Nulo</option>
                <option value="cancelled">Anulado</option>
                <option value="closed">Cerrado</option>
              </select>
            </label>
            {(selectedPrediction.status === 'won' || selectedPrediction.status === 'closed') && (
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

export default VerifyPredictions;
