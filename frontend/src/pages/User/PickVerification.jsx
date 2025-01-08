import React, { useState, useEffect } from "react";

const PickVerification = () => {
  const [picks, setPicks] = useState([]); // Estado para los picks pendientes
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(""); // Estado de error
  const [success, setSuccess] = useState(""); // Mensaje de éxito
  const [selectedPick, setSelectedPick] = useState(null); // Pick seleccionado para actualizar
  const [newStatus, setNewStatus] = useState(""); // Nuevo estado para confirmar
  const [showModal, setShowModal] = useState(false); // Estado del modal

  // Cargar picks pendientes desde el backend
  useEffect(() => {
    const fetchPicks = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/picks/pending");
        if (!response.ok) {
          throw new Error("Error al cargar los picks pendientes.");
        }
        const data = await response.json();
        setPicks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPicks();
  }, []);

  // Manejar la confirmación del modal
  const handleConfirm = (pickId, status) => {
    const pick = picks.find((p) => p.id === pickId);
    setSelectedPick(pick);
    setNewStatus(status);
    setShowModal(true);
  };

  // Cerrar el modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPick(null);
    setNewStatus("");
  };

  // Actualizar el estado del pick
  const handleUpdatePick = async () => {
    if (!selectedPick || !newStatus) return;

    try {
      setError("");
      setSuccess("");
      setShowModal(false);

      const response = await fetch(`http://localhost:5000/api/picks/${selectedPick.id}/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el estado del pick.");
      }

      // Actualizar la lista de picks localmente
      setPicks((prevPicks) => prevPicks.filter((pick) => pick.id !== selectedPick.id));
      setSuccess(`Estado actualizado a "${newStatus}" para el evento: ${selectedPick.event}.`);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <p className="text-center">Cargando picks pendientes...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (picks.length === 0) {
    return <p className="text-center">No tienes picks pendientes de verificación.</p>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Verificación de Picks</h2>
      {success && <p className="text-sm text-green-500 mb-4">{success}</p>}
      {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

      <ul className="space-y-4">
        {picks.map((pick) => (
          <li key={pick.id} className="border p-4 rounded-md">
            <div className="flex justify-between items-center">
              <div>
                <p>
                  <strong>Evento:</strong> {pick.event}
                </p>
                <p>
                  <strong>Stake:</strong> {pick.stake}
                </p>
                <p>
                  <strong>Cuota:</strong> {pick.odds}
                </p>
                <p>
                  <strong>Fecha:</strong> {pick.date || "Sin fecha"} {/* Si está disponible */}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleConfirm(pick.id, "acertado")}
                  className="py-1 px-3 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Acertado
                </button>
                <button
                  onClick={() => handleConfirm(pick.id, "fallado")}
                  className="py-1 px-3 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Fallado
                </button>
                <button
                  onClick={() => handleConfirm(pick.id, "nulo")}
                  className="py-1 px-3 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Nulo
                </button>
                <button
                  onClick={() => handleConfirm(pick.id, "anulado")}
                  className="py-1 px-3 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Anulado
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal de Confirmación */}
      {showModal && selectedPick && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-bold mb-4">Confirmar Estado del Pick</h3>
            <p>
              <strong>Evento:</strong> {selectedPick.event}
            </p>
            <p>
              <strong>Stake:</strong> {selectedPick.stake}
            </p>
            <p>
              <strong>Cuota:</strong> {selectedPick.odds}
            </p>
            <p>
              <strong>Fecha:</strong> {selectedPick.date || "Sin fecha"}
            </p>
            <p>
              <strong>Nuevo Estado:</strong> {newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}
            </p>
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={handleCloseModal}
                className="py-2 px-4 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={handleUpdatePick}
                className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PickVerification;
