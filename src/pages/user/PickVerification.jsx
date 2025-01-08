import React from "react";

const PickVerification = ({ picks }) => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">Verificación de Picks Propios</h2>
      <ul className="mt-4">
        {picks.map((pick, index) => (
          <li key={index} className="mb-2 border p-2 rounded">
            <p>Evento: {pick.event}</p>
            <p>Estado: {pick.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PickVerification;
