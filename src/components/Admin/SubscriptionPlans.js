import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SubscriptionPlans = () => {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await axios.get('/admin/plans');
      setPlans(response.data);
    } catch (error) {
      console.error('Error fetching plans:', error);
    }
  };

  const handleDeletePlan = async (id) => {
    try {
      await axios.delete(`/admin/plans/${id}`);
      fetchPlans();
    } catch (error) {
      console.error('Error deleting plan:', error);
    }
  };

  const handleUpdatePlan = async (id, updatedData) => {
    try {
      await axios.put(`/admin/plans/${id}`, updatedData);
      fetchPlans();
    } catch (error) {
      console.error('Error updating plan:', error);
    }
  };

  const handleCreatePlan = async (newPlan) => {
    try {
      await axios.post('/admin/plans', newPlan);
      fetchPlans();
    } catch (error) {
      console.error('Error creating plan:', error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="text-xl font-bold mb-2">Planes de Suscripción</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Nombre del Plan</th>
            <th className="py-2">Descripción</th>
            <th className="py-2">Precio</th>
            <th className="py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {plans.map(plan => (
            <tr key={plan._id}>
              <td className="py-2">{plan.name}</td>
              <td className="py-2">{plan.description}</td>
              <td className="py-2">{plan.price}</td>
              <td className="py-2">
                <button onClick={() => handleDeletePlan(plan._id)} className="text-red-500">Eliminar</button>
                <button onClick={() => setSelectedPlan(plan)} className="text-blue-500 ml-4">Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedPlan && (
        <div className="mt-4">
          <h3 className="text-lg font-bold">Editar Plan de Suscripción</h3>
          <form onSubmit={(e) => {
            e.preventDefault();
            handleUpdatePlan(selectedPlan._id, selectedPlan);
          }}>
            <label className="block">
              Nombre del Plan:
              <input type="text" value={selectedPlan.name} onChange={(e) => setSelectedPlan({ ...selectedPlan, name: e.target.value })} className="mt-1 block w-full" />
            </label>
            <label className="block mt-2">
              Descripción:
              <input type="text" value={selectedPlan.description} onChange={(e) => setSelectedPlan({ ...selectedPlan, description: e.target.value })} className="mt-1 block w-full" />
            </label>
            <label className="block mt-2">
              Precio:
              <input type="number" value={selectedPlan.price} onChange={(e) => setSelectedPlan({ ...selectedPlan, price: e.target.value })} className="mt-1 block w-full" />
            </label>
            <label className="block mt-2">
              Acceso al Bot:
              <input type="checkbox" checked={selectedPlan.services.botAccess} onChange={(e) => setSelectedPlan({ ...selectedPlan, services: { ...selectedPlan.services, botAccess: e.target.checked } })} className="mt-1" />
            </label>
            <label className="block mt-2">
              Estadísticas Mejoradas:
              <input type="checkbox" checked={selectedPlan.services.enhancedStatistics} onChange={(e) => setSelectedPlan({ ...selectedPlan, services: { ...selectedPlan.services, enhancedStatistics: e.target.checked } })} className="mt-1" />
            </label>
            <label className="block mt-2">
              Verificación de Picks:
              <input type="checkbox" checked={selectedPlan.services.pickVerification} onChange={(e) => setSelectedPlan({ ...selectedPlan, services: { ...selectedPlan.services, pickVerification: e.target.checked } })} className="mt-1" />
            </label>
            <label className="block mt-2">
              Perfil Ampliado:
              <input type="checkbox" checked={selectedPlan.services.extendedProfile} onChange={(e) => setSelectedPlan({ ...selectedPlan, services: { ...selectedPlan.services, extendedProfile: e.target.checked } })} className="mt-1" />
            </label>
            <label className="block mt-2">
              Compartir en Redes Sociales:
              <input type="checkbox" checked={selectedPlan.services.socialSharing} onChange={(e) => setSelectedPlan({ ...selectedPlan, services: { ...selectedPlan.services, socialSharing: e.target.checked } })} className="mt-1" />
            </label>
            <label className="block mt-2">
              Estadísticas Premium:
              <input type="checkbox" checked={selectedPlan.services.premiumStatistics} onChange={(e) => setSelectedPlan({ ...selectedPlan, services: { ...selectedPlan.services, premiumStatistics: e.target.checked } })} className="mt-1" />
            </label>
            <label className="block mt-2">
              Formulario de Pronósticos Premium:
              <input type="checkbox" checked={selectedPlan.services.premiumPredictionForm} onChange={(e) => setSelectedPlan({ ...selectedPlan, services: { ...selectedPlan.services, premiumPredictionForm: e.target.checked } })} className="mt-1" />
            </label>
            <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Guardar Cambios</button>
          </form>
        </div>
      )}

      <div className="mt-4">
        <h3 className="text-lg font-bold">Crear Nuevo Plan de Suscripción</h3>
        <form onSubmit={(e) => {
          e.preventDefault();
          const newPlan = {
            name: e.target.name.value,
            description: e.target.description.value,
            price: e.target.price.value,
            services: {
              botAccess: e.target.botAccess.checked,
              enhancedStatistics: e.target.enhancedStatistics.checked,
              pickVerification: e.target.pickVerification.checked,
              extendedProfile: e.target.extendedProfile.checked,
              socialSharing: e.target.socialSharing.checked,
              premiumStatistics: e.target.premiumStatistics.checked,
              premiumPredictionForm: e.target.premiumPredictionForm.checked
            }
          };
          handleCreatePlan(newPlan);
          e.target.reset();
        }}>
          <label className="block">
            Nombre del Plan:
            <input type="text" name="name" className="mt-1 block w-full" required />
          </label>
          <label className="block mt-2">
            Descripción:
            <input type="text" name="description" className="mt-1 block w-full" required />
          </label>
          <label className="block mt-2">
            Precio:
            <input type="number" name="price" className="mt-1 block w-full" required />
          </label>
          <label className="block mt-2">
            Acceso al Bot:
            <input type="checkbox" name="botAccess" className="mt-1" />
          </label>
          <label className="block mt-2">
            Estadísticas Mejoradas:
            <input type="checkbox" name="enhancedStatistics" className="mt-1" />
          </label>
          <label className="block mt-2">
            Verificación de Picks:
            <input type="checkbox" name="pickVerification" className="mt-1" />
          </label>
          <label className="block mt-2">
            Perfil Ampliado:
            <input type="checkbox" name="extendedProfile" className="mt-1" />
          </label>
          <label className="block mt-2">
            Compartir en Redes Sociales:
            <input type="checkbox" name="socialSharing" className="mt-1" />
          </label>
          <label className="block mt-2">
            Estadísticas Premium:
            <input type="checkbox" name="premiumStatistics" className="mt-1" />
          </label>
          <label className="block mt-2">
            Formulario de Pronósticos Premium:
            <input type="checkbox" name="premiumPredictionForm" className="mt-1" />
          </label>
          <button type="submit" className="mt-4 bg-green-500 text-white py-2 px-4 rounded">Crear Plan</button>
        </form>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
