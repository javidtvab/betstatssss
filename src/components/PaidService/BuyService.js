import React, { useState } from 'react';
import axios from 'axios';

const BuyService = () => {
  const [serviceName] = useState('betsapi_access');
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  const handleBuyService = async () => {
    try {
      await axios.post('/api/paidService/buy', { serviceName });
      setPurchaseSuccess(true);
    } catch (error) {
      console.error('Error buying service:', error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="text-xl font-bold mb-2">Comprar Acceso a API de Apuestas</h2>
      {!purchaseSuccess ? (
        <button onClick={handleBuyService} className="bg-blue-500 text-white py-2 px-4 rounded">Comprar Servicio</button>
      ) : (
        <p className="text-green-500">Servicio comprado con éxito. Ahora puedes crear picks usando la API de apuestas.</p>
      )}
    </div>
  );
};

export default BuyService;
