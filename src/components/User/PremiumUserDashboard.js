import React from 'react';
import PremiumProfile from './premiumProfile';
import PicksList from './PicksList';
import UserStatistics from './UserStatistics';
import CreatePick from './CreatePick';
import PendingPicks from './PendingPicks';

const PremiumUserDashboard = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Panel de Usuario Premium</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PremiumProfile />
        <CreatePick />
        <PicksList />
        <UserStatistics />
        <PendingPicks />
        {/* Añadir otros componentes aquí */}
      </div>
    </div>
  );
};

export default PremiumUserDashboard;
