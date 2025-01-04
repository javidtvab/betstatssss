import React from 'react';
import UserManagement from './UserManagement';
import SubscriptionPlans from './SubscriptionPlans';
import SalesStatistics from './SalesStatistics';

const AdminDashboard = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Panel de Administración</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <UserManagement />
        <SubscriptionPlans />
        <SalesStatistics />
        {/* Añadir otros componentes aquí */}
      </div>
    </div>
  );
};

export default AdminDashboard;
