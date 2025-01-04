import React from 'react';
import Profile from './Profile';
import PicksList from './PicksList';
import UserStatistics from './UserStatistics';

const UserDashboard = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Panel de Usuario</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Profile />
        <PicksList />
        <UserStatistics />
        {/* Añadir otros componentes aquí */}
      </div>
    </div>
  );
};

export default UserDashboard;
