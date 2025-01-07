import React from 'react';
import PremiumProfile from './premiumProfile';
import PicksList from './PicksList';
import Statistics from './Statistics';
import CreatePick from './CreatePick'; // Componente de creación de picks para usuarios premium
import MySales from './MySales'; // Componente de mis ventas
import ConfigureTelegram from './ConfigureTelegram'; // Componente de configuración de Telegram
import AdvancedStatistics from './AdvancedStatistics'; // Componente de estadísticas avanzadas
import PendingPicks from '../User/PendingPicks'; // Reutilizamos el componente de picks pendientes

const PremiumUserDashboard = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Panel de Usuario Premium</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PremiumProfile />
        <CreatePick />
        <PicksList />
        <Statistics />
        <PendingPicks />
        <MySales />
        <ConfigureTelegram />
        <AdvancedStatistics />
      </div>
    </div>
  );
};

export default PremiumUserDashboard;
