import React from "react";

const Basic = () => {
  const services = [
    { id: 1, name: "Consulta de Picks Básicos", description: "Acceso a una selección limitada de picks verificados." },
    { id: 2, name: "Estadísticas Generales", description: "Visualización de estadísticas básicas sobre rendimiento global." },
    { id: 3, name: "Acceso Limitado a Tipsters", description: "Consulta de información básica de los tipsters más destacados." },
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Servicios Básicos</h2>

      <p className="text-center mb-6">
        Los servicios básicos te permiten explorar opciones limitadas pero útiles para empezar en nuestra plataforma.
      </p>

      {/* Lista de Servicios Básicos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-lg transition duration-200"
          >
            <h3 className="text-lg font-bold mb-2">{service.name}</h3>
            <p className="text-sm text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>

      {/* Call-to-Action */}
      <div className="mt-6 text-center">
        <p className="mb-4">¿Quieres acceder a más funcionalidades?</p>
        <button
          className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
          onClick={() => alert("Redirigiendo a planes avanzados...")}
        >
          Actualiza a Premium
        </button>
      </div>
    </div>
  );
};

export default Basic;
