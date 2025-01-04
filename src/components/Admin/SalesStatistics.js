import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SalesStatistics = () => {
  const [statistics, setStatistics] = useState(null);

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      const response = await axios.get('/admin/sales-statistics');
      setStatistics(response.data);
    } catch (error) {
      console.error('Error fetching sales statistics:', error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="text-xl font-bold mb-2">Estadísticas de Ventas</h2>
      {statistics ? (
        <div>
          <p>Total de Ventas: ${statistics.totalSales.toFixed(2)}</p>
          <p>Total de Transacciones: {statistics.totalTransactions}</p>
          <p>Venta Promedio: ${statistics.averageSale.toFixed(2)}</p>
        </div>
      ) : (
        <p>Cargando estadísticas...</p>
      )}
    </div>
  );
};

export default SalesStatistics;
