import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SoldPicks = () => {
  const [pickSales, setPickSales] = useState([]);

  useEffect(() => {
    fetchPickSales();
  }, []);

  const fetchPickSales = async () => {
    try {
      const response = await axios.get('/api/premiumUser/sales/picks');
      setPickSales(response.data);
    } catch (error) {
      console.error('Error fetching pick sales:', error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="text-xl font-bold mb-2">Picks Vendidos</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Descripción</th>
            <th className="py-2">Cuota</th>
            <th className="py-2">Stake</th>
            <th className="py-2">Importe</th>
            <th className="py-2">Usuario</th>
          </tr>
        </thead>
        <tbody>
          {pickSales.map(sale => (
            <tr key={sale._id}>
              <td className="py-2">{sale.pickId.description}</td>
              <td className="py-2">{sale.pickId.odds}</td>
              <td className="py-2">{sale.pickId.stake}</td>
              <td className="py-2">{sale.amount.toFixed(2)} €</td>
              <td className="py-2">{sale.buyerId.username} ({sale.buyerId.email})</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SoldPicks;
