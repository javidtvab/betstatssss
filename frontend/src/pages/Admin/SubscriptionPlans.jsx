import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";

const SubscriptionPlans = () => {
  const [plans, setPlans] = useState([]); // Lista de planes de suscripción
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(""); // Estado de error
  const [notification, setNotification] = useState(""); // Notificación visual
  const [newPlan, setNewPlan] = useState({ name: "", price: "", duration: "" }); // Nuevo plan
  const [editingPlan, setEditingPlan] = useState(null); // Plan en edición
  const [filter, setFilter] = useState("all"); // Filtro por categoría
  const [order, setOrder] = useState("price-asc"); // Ordenación por precio o duración

  useEffect(() => {
    // Cargar planes desde el backend
    const fetchPlans = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/admin/subscription-plans");
        if (!response.ok) {
          throw new Error("Error al cargar los planes de suscripción.");
        }
        const data = await response.json();
        setPlans(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  // Mostrar notificación
  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 3000); // Ocultar notificación después de 3 segundos
  };

  // Manejar cambios en el formulario de nuevo plan
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPlan((prev) => ({ ...prev, [name]: value }));
  };

  // Validar campos
  const validateFields = (plan) => {
    if (!plan.name || plan.name.trim() === "") {
      setError("El nombre del plan es obligatorio.");
      return false;
    }
    if (!plan.price || isNaN(plan.price) || plan.price <= 0) {
      setError("El precio debe ser un número mayor a 0.");
      return false;
    }
    if (!plan.duration || isNaN(plan.duration) || plan.duration <= 0) {
      setError("La duración debe ser un número mayor a 0.");
      return false;
    }
    setError("");
    return true;
  };

  // Agregar un nuevo plan
  const addPlan = async () => {
    if (!validateFields(newPlan)) return;

    try {
      const response = await fetch("http://localhost:5000/api/admin/subscription-plans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPlan),
      });

      if (!response.ok) {
        throw new Error("Error al agregar el plan.");
      }

      const createdPlan = await response.json();
      setPlans((prev) => [...prev, createdPlan]);
      setNewPlan({ name: "", price: "", duration: "" });
      showNotification("Plan agregado con éxito.");
    } catch (err) {
      setError(err.message);
    }
  };

  // Editar un plan existente
  const editPlan = async () => {
    if (!validateFields(editingPlan)) return;

    try {
      const response = await fetch(`http://localhost:5000/api/admin/subscription-plans/${editingPlan.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingPlan),
      });

      if (!response.ok) {
        throw new Error("Error al editar el plan.");
      }

      const updatedPlan = await response.json();
      setPlans((prev) => prev.map((plan) => (plan.id === updatedPlan.id ? updatedPlan : plan)));
      setEditingPlan(null);
      showNotification("Plan editado con éxito.");
    } catch (err) {
      setError(err.message);
    }
  };

  // Eliminar un plan
  const deletePlan = async (planId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/subscription-plans/${planId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el plan.");
      }

      setPlans((prev) => prev.filter((plan) => plan.id !== planId));
      showNotification("Plan eliminado con éxito.");
    } catch (err) {
      setError(err.message);
    }
  };

  // Filtrar y ordenar planes
  const filteredPlans = plans
    .filter((plan) => filter === "all" || plan.duration <= 90) // Ejemplo: filtro por duración
    .sort((a, b) => {
      if (order === "price-asc") return a.price - b.price;
      if (order === "price-desc") return b.price - a.price;
      if (order === "duration-asc") return a.duration - b.duration;
      if (order === "duration-desc") return b.duration - a.duration;
      return 0;
    });

  if (loading) {
    return <p className="text-center">Cargando planes de suscripción...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Gestión de Planes de Suscripción</h2>

      {/* Notificación */}
      {notification && (
        <div className="mb-6 bg-green-100 text-green-800 p-4 rounded-lg">
          {notification}
        </div>
      )}

      {/* Tabla de Planes */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr>
              <th className="border-b py-2 px-4">Nombre</th>
              <th className="border-b py-2 px-4">Precio</th>
              <th className="border-b py-2 px-4">Duración (días)</th>
              <th className="border-b py-2 px-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredPlans.map((plan) => (
              <tr key={plan.id}>
                <td className="border-b py-2 px-4">{plan.name}</td>
                <td className="border-b py-2 px-4">${plan.price}</td>
                <td className="border-b py-2 px-4">{plan.duration}</td>
                <td className="border-b py-2 px-4">
                  <button
                    onClick={() => setEditingPlan(plan)}
                    className="py-1 px-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mr-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => deletePlan(plan.id)}
                    className="py-1 px-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Formularios (Agregar y Editar) */}
      <div className="mt-6">
        {/* Nuevo Plan */}
        {!editingPlan && (
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-bold mb-4">Agregar Nuevo Plan</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                name="name"
                value={newPlan.name}
                onChange={handleInputChange}
                placeholder="Nombre"
                className="p-2 border border-gray-300 rounded-md"
              />
              <input
                type="number"
                name="price"
                value={newPlan.price}
                onChange={handleInputChange}
                placeholder="Precio"
                className="p-2 border border-gray-300 rounded-md"
              />
              <input
                type="number"
                name="duration"
                value={newPlan.duration}
                onChange={handleInputChange}
                placeholder="Duración (días)"
                className="p-2 border border-gray-300 rounded-md"
              />
            </div>
            <button
              onClick={addPlan}
              className="mt-4 py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Agregar Plan
            </button>
          </div>
        )}

        {/* Editar Plan */}
        {editingPlan && (
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-bold mb-4">Editar Plan</h3>
            <div
            className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                name="name"
                value={editingPlan.name}
                onChange={(e) => setEditingPlan({ ...editingPlan, name: e.target.value })}
                placeholder="Nombre"
                className="p-2 border border-gray-300 rounded-md"
              />
              <input
                type="number"
                name="price"
                value={editingPlan.price}
                onChange={(e) => setEditingPlan({ ...editingPlan, price: e.target.value })}
                placeholder="Precio"
                className="p-2 border border-gray-300 rounded-md"
              />
              <input
                type="number"
                name="duration"
                value={editingPlan.duration}
                onChange={(e) => setEditingPlan({ ...editingPlan, duration: e.target.value })}
                placeholder="Duración (días)"
                className="p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex space-x-4 mt-4">
              <button
                onClick={editPlan}
                className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Guardar Cambios
              </button>
              <button
                onClick={() => setEditingPlan(null)}
                className="py-2 px-4 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionPlans;
