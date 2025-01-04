import React from 'react';
import Profile from './Profile';

const UserDashboard = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Panel de Usuario</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Profile />
        {/* Añadir otros componentes aquí */}
      </div>
    </div>
  );
};

export default UserDashboard;
