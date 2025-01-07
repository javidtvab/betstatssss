import React from 'react';
import CreatePick from './PaidService/CreatePick'; // Componente de creación de picks para usuarios que compraron el servicio
import BuyService from './PaidService/BuyService'; // Componente para comprar el servicio

const UserDashboard = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Panel de Usuario</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BuyService />
        <CreatePick />
      </div>
    </div>
  );
};

export default UserDashboard;
