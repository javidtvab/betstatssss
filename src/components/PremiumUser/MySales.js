import React, { useState } from 'react';
import SoldSubscriptions from './SoldSubscriptions';
import SoldPicks from './SoldPicks';

const MySales = () => {
  const [activeTab, setActiveTab] = useState('subscriptions');

  const renderContent = () => {
    if (activeTab === 'subscriptions') {
      return <SoldSubscriptions />;
    } else if (activeTab === 'picks') {
      return <SoldPicks />;
    }
    return null;
  };

  return (
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="text-xl font-bold mb-2">Mis Ventas</h2>
      <div className="mb-4">
        <button
          className={`mr-2 py-2 px-4 rounded ${activeTab === 'subscriptions' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('subscriptions')}
        >
          Suscripciones Vendidas
        </button>
        <button
          className={`py-2 px-4 rounded ${activeTab === 'picks' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('picks')}
        >
          Picks Vendidos
        </button>
      </div>
      {renderContent()}
    </div>
  );
};

export default MySales;
