import React, { useState, useEffect } from "react";

const Premium = () => {
  const [premiumServices, setPremiumServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [subscriptionStatus, setSubscriptionStatus] = useState("");
  const [subscriptionHistory, setSubscriptionHistory] = useState([]);
  const [role, setRole] = useState("básico"); // Rol del usuario
  const [notification, setNotification] = useState(""); // Notificación visual

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Verificar el rol del usuario
        const roleResponse = await fetch("http://localhost:5000/api/user/role", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token") || ""}` },
        });
        if (!roleResponse.ok) throw new Error("Error al verificar el rol del usuario.");
        const roleData = await roleResponse.json();
        setRole(roleData.role);

        // Cargar servicios premium
        const servicesResponse = await fetch("http://localhost:5000/api/services/premium");
        if (!servicesResponse.ok) throw new Error("Error al cargar los servicios premium.");
        const servicesData = await servicesResponse.json();
        setPremiumServices(servicesData);

        // Cargar historial de suscripciones
        const historyResponse = await fetch("http://localhost:5000/api/subscription/history", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token") || ""}` },
        });
        if (!historyResponse.ok) throw new Error("Error al cargar el historial de suscripciones.");
        const historyData = await historyResponse.json();
        const activeSubscription = historyData.find((sub) => sub.status === "Activo");
        setSubscriptionStatus(activeSubscription ? "premium" : "básico");
        setSubscriptionHistory(historyData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const requestPremiumAccess = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/subscription/assign-premium", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al asignar estado premium.");
      }

      setSubscriptionStatus("premium");
      setNotification("¡Tu acceso premium ha sido activado!");
    } catch (err) {
      setError(err.message);
    }
  };

  const clearNotification = () => {
    setNotification("");
  };

  if (loading) {
    return <p className="text-center">Cargando servicios premium...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Servicios Premium</h2>

      {notification && (
        <div className="mb-6 bg-green-100 text-green-800 p-4 rounded-lg">
          {notification}
          <button onClick={clearNotification} className="ml-4 text-red-600">
            X
          </button>
        </div>
      )}

      {/* Lista de Servicios Premium */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {premiumServices.map((service) => (
          <div
            key={service.id}
            className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-lg transition duration-200"
          >
            <h3 className="text-lg font-bold mb-2">{service.name}</h3>
            <p className="text-sm text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>

      {/* Historial de Suscripciones */}
      <div className="mt-8">
        <h3 className="text-xl font-bold text-center mb-4">Historial de Suscripciones</h3>
        {subscriptionHistory.length > 0 ? (
          <ul className="list-disc list-inside">
            {subscriptionHistory.map((sub, index) => (
              <li key={index}>
                {sub.date}: Plan {sub.plan} - {sub.status}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">No tienes historial de suscripciones.</p>
        )}
      </div>

      {/* Call-to-Action */}
      <div className="mt-8 text-center">
        {role === "administrador" ? (
          <p className="text-green-600 font-semibold">
            Eres administrador. Gestiona los accesos premium desde la administración.
          </p>
        ) : subscriptionStatus === "premium" ? (
          <p className="text-green-600 font-semibold">
            Ya tienes acceso a los servicios premium. ¡Disfrútalos!
          </p>
        ) : (
          <button
            className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
            onClick={requestPremiumAccess}
          >
            Solicitar Acceso Premium
          </button>
        )}
      </div>
    </div>
  );
};

export default Premium;
