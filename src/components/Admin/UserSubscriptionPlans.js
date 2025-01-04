import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserSubscriptionPlans = () => {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await axios.get('/admin/user-subscription-plans');
      setPlans(response.data);
    } catch (error) {
      console.error('Error fetching subscription plans:', error);
    }
  };

  const handleDeletePlan = async (id) => {
    try {
      await axios.delete(`/admin/user-subscription-plans/${id}`);
      fetchPlans();
    } catch (error) {
      console.error('Error deleting subscription plan:', error);
    }
  };

  const handleUpdatePlan = async (id, updatedData) => {
    try {
      await axios.put(`/admin/user-subscription-plans/${id}`, updatedData);
      fetchPlans();
    } catch (error) {
      console.error('Error updating subscription plan:', error);
    }
  };

  const handleCreatePlan = async (newPlan) => {
    try {
      await axios.post('/admin/user-subscription-plans', newPlan);
      fetchPlans();
    } catch (error) {
      console.error('Error creating subscription plan:', error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="text-xl font-bold mb-2">Planes de Suscripción de Usuarios</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Usuario</th>
            <th className="py-2">Plan</th>
            <th className="py-2">Precio</th>
            <th className="py-2">Duración</th>
            <th className="py-2">Fecha Fin</th>
            <th className="py-2">Canal Telegram</th>
            <th className="py-2">Email</th>
            <th className="py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {plans.map(plan => (
            <tr key={plan._id}>
              <td className="py-2">{plan.userId.username}</td>
              <td className="py-2">{plan.planId.name}</td>
              <td className="py-2">{plan.price}</td>
              <td className="py-2">{plan.duration}</td>
              <td className="py-2">{plan.endDate ? new Date(plan.endDate).toLocaleDateString() : 'N/A'}</td>
              <td className="py-2">{plan.telegramChannel}</td>
              <td className="py-2">{plan.email}</td>
              <td className="py-2">
                <button onClick={() => setSelectedPlan(plan)} className="text-blue-500 ml-4">Editar</button>
                <button onClick={() => handleDeletePlan(plan._id)} className="text-red-500 ml-4">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedPlan && (
        <div className="mt-4">
          <h3 className="text-lg font-bold">Editar Plan de Suscripción de Usuario</h3>
          <form onSubmit={(e) => {
            e.preventDefault();
            handleUpdatePlan(selectedPlan._id, selectedPlan);
            setSelectedPlan(null);
          }}>
            <label className="block">
              Usuario:
              <input type="text" value={selectedPlan.userId.username} readOnly className="mt-1 block w-full" />
            </label>
            <label className="block mt-2">
              Plan:
              <input type="text" value={selectedPlan.planId.name} readOnly className="mt-1 block w-full" />
            </label>
            <label className="block mt-2">
              Precio:
              <input type="number" value={selectedPlan.price} onChange={(e) => setSelectedPlan({ ...selectedPlan, price: e.target.value })} className="mt-1 block w-full" />
            </label>
            <label className="block mt-2">
              Duración (días):
              <input type="number" value={selectedPlan.duration} onChange={(e) => setSelectedPlan({ ...selectedPlan, duration: e.target.value })} className="mt-1 block w-full" />
            </label>
            <label className="block mt-2">
              Fecha Fin:
              <input type="date" value={selectedPlan.endDate ? new Date(selectedPlan.endDate).toISOString().split('T')[0] : ''} onChange={(e) => setSelectedPlan({ ...selectedPlan, endDate: e.target.value })} className="mt-1 block w-full" />
            </label>
            <label className="block mt-2">
              Canal Telegram:
              <input type="text" value={selectedPlan.telegramChannel} onChange={(e) => setSelectedPlan({ ...selectedPlan, telegramChannel: e.target.value })} className="mt-1 block w-full" />
            </label>
            <label className="block mt-2">
              Email:
              <input type="email" value={selectedPlan.email} onChange={(e) => setSelectedPlan({ ...selectedPlan, email: e.target.value })} className="mt-1 block w-full" />
            </label>
            <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Guardar Cambios</button>
          </form>
        </div>
      )}

      <div className="mt-4">
        <h3 className="text-lg font-bold">Crear Nuevo Plan de Suscripción de Usuario</h3>
        <form onSubmit={(e) => {
          e.preventDefault();
          const newPlan = {
            userId: e.target.userId.value,
            planId: e.target.planId.value,
            price: e.target.price.value,
            duration: e.target.duration.value,
            endDate: e.target.endDate.value,
            telegramChannel: e.target.telegramChannel.value,
            email: e.target.email.value
          };
          handleCreatePlan(newPlan);
          e.target.reset();
        }}>
          <label className="block">
            Usuario:
            <input type="text" name="userId" className="mt-1 block w-full" required />
          </label>
          <label className="block mt-2">
            Plan:
            <input type="text" name="planId" className="mt-1 block w-full" required />
          </label>
          <label className="block mt-2">
            Precio:
            <input type="number" name="price" className="mt-1 block w-full" required />
          </label>
          <label className="block mt-2">
            Duración (días):
            <input type="number" name="duration" className="mt-1 block w-full" required />
          </label>
          <label className="block mt-2">
            Fecha Fin:
            <input type="date" name="endDate" className="mt-1 block w-full" />
          </label>
          <label className="block mt-2">
            Canal Telegram:
            <input type="text" name="telegramChannel" className="mt-1 block w-full" required />
          </label>
          <label className="block mt-2">
            Email:
            <input type="email" name="email" className="mt-1 block w-full" required />
          </label>
          <button type="submit" className="mt-4 bg-green-500 text-white py-2 px-4 rounded">Crear Plan</button>
        </form>
      </div>
    </div>
  );
};

export default UserSubscriptionPlans;
