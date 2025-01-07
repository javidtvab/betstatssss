import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SoldSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const response = await axios.get('/api/premiumUser/sales/subscriptions');
      setSubscriptions(response.data);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="text-xl font-bold mb-2">Suscripciones Vendidas</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Fecha Inicio</th>
            <th className="py-2">Fecha Fin</th>
            <th className="py-2">Importe</th>
            <th className="py-2">Usuario</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map(subscription => (
            <tr key={subscription._id}>
              <td className="py-2">{new Date(subscription.startDate).toLocaleDateString()}</td>
              <td className="py-2">{new Date(subscription.endDate).toLocaleDateString()}</td>
              <td className="py-2">{subscription.amount.toFixed(2)} €</td>
              <td className="py-2">{subscription.buyerId.username} ({subscription.buyerId.email})</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SoldSubscriptions;
