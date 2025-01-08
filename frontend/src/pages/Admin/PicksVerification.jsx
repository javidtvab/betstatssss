import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";

const PicksVerification = () => {
  const [picks, setPicks] = useState([]); // Lista de picks
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(""); // Estado de error
  const [notification, setNotification] = useState(""); // Notificaciones visuales
  const [filter, setFilter] = useState("pending"); // Filtro por estado
  const [dateRange, setDateRange] = useState({ start: "", end: "" }); // Filtro por rango de fechas
  const [searchUser, setSearchUser] = useState(""); // Filtro por usuario
  const [selectedPicks, setSelectedPicks] = useState([]); // Picks seleccionados para acciones en masa
  const [confirmAction, setConfirmAction] = useState(null); // Acción pendiente de confirmación

  useEffect(() => {
    // Cargar picks desde el backend
    const fetchPicks = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/admin/picks");
        if (!response.ok) {
          throw new Error("Error al cargar los picks.");
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

  // Mostrar notificación
  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 3000); // Ocultar notificación después de 3 segundos
  };

  // Filtrar picks por estado, rango de fechas y usuario
  const filteredPicks = picks.filter((pick) => {
    const matchesState = filter === "all" || pick.status === filter;
    const matchesUser =
      searchUser === "" || pick.user.toLowerCase().includes(searchUser.toLowerCase());
    const matchesDate =
      (!dateRange.start || new Date(pick.date) >= new Date(dateRange.start)) &&
      (!dateRange.end || new Date(pick.date) <= new Date(dateRange.end));
    return matchesState && matchesUser && matchesDate;
  });

  // Actualizar estado en masa
  const updateSelectedPicksStatus = async (newStatus) => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/picks/bulk", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pickIds: selectedPicks, status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar los picks seleccionados.");
      }

      setPicks((prevPicks) =>
        prevPicks.map((pick) =>
          selectedPicks.includes(pick.id) ? { ...pick, status: newStatus } : pick
        )
      );
      setSelectedPicks([]);
      setConfirmAction(null);
      showNotification(`Picks actualizados a ${newStatus}`);
    } catch (err) {
      setError(err.message);
    }
  };

  const confirmMassAction = (action) => {
    if (selectedPicks.length === 0) {
      setError("No hay picks seleccionados.");
      return;
    }
    setConfirmAction(action);
  };

  const executeMassAction = () => {
    if (confirmAction) {
      updateSelectedPicksStatus(confirmAction);
    }
  };

  const cancelMassAction = () => {
    setConfirmAction(null);
  };

  const togglePickSelection = (pickId) => {
    setSelectedPicks((prevSelected) =>
      prevSelected.includes(pickId)
        ? prevSelected.filter((id) => id !== pickId)
        : [...prevSelected, pickId]
    );
  };

  const selectAllPicks = (selectAll) => {
    if (selectAll) {
      setSelectedPicks(filteredPicks.map((pick) => pick.id));
    } else {
      setSelectedPicks([]);
    }
  };

  if (loading) {
    return <p className="text-center">Cargando picks...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Verificación de Picks</h2>

      {/* Notificaciones */}
      {notification && (
        <div className="mb-6 bg-green-100 text-green-800 p-4 rounded-lg">{notification}</div>
      )}

      {/* Filtros */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="all">Todos</option>
          <option value="pending">Pendientes</option>
          <option value="accepted">Aceptados</option>
          <option value="rejected">Rechazados</option>
        </select>
        <input
          type="date"
          value={dateRange.start}
          onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
          className="p-2 border border-gray-300 rounded-md"
        />
        <input
          type="date"
          value={dateRange.end}
          onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
          className="p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-6 flex items-center justify-between">
        <input
          type="text"
          placeholder="Buscar por usuario..."
          value={searchUser}
          onChange={(e) => setSearchUser(e.target.value)}
          className="p-2 border border-gray-300 rounded-md flex-grow mr-4"
        />
        {selectedPicks.length > 0 && (
          <div className="flex space-x-4">
            <button
              onClick={() => confirmMassAction("accepted")}
              className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Aceptar Seleccionados
            </button>
            <button
              onClick={() => confirmMassAction("rejected")}
              className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Rechazar Seleccionados
            </button>
          </div>
        )}
      </div>

      {/* Tabla de Picks */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr>
              <th className="border-b py-2 px-4">
                <input
                  type="checkbox"
                  onChange={(e) => selectAllPicks(e.target.checked)}
                />
              </th>
              <th className="border-b py-2 px-4">Usuario</th>
              <th className="border-b py-2 px-4">Evento</th>
              <th className="border-b py-2 px-4">Cuota</th>
              <th className="border-b py-2 px-4">Estado</th>
              <th className="border-b py-2 px-4">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {filteredPicks.map((pick) => (
              <tr key={pick.id}>
                <td className="border-b py-2 px-4">
                  <input
                    type="checkbox"
                    checked={selectedPicks.includes(pick.id)}
                    onChange={() => togglePickSelection(pick.id)}
                  />
                </td>
                <td className="border-b py-2 px-4">{pick.user}</td>
                <td className="border-b py-2 px-4">{pick.event}</td>
                <td className="border-b py-2 px-4">{pick.odds}</td>
                <td className="border-b py-2 px-4">{pick.status}</td>
                <td className="border-b py-2 px-4">{pick.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirmación de Acciones en Masa */}
      {confirmAction && (
        <div className="mt-6 bg-yellow-100 p-4 rounded-lg">
          <h3 className="text-lg font-bold mb-4">Confirmación</h3>
          <p>¿Estás seguro de que deseas {confirmAction === "accepted" ? "aceptar" : "rechazar"} los picks seleccionados?</p>
          <div className="flex space-x-4 mt-4">
            <button
              onClick={executeMassAction}
              className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Confirmar
            </button>
            <button
              onClick={cancelMassAction}
              className="py-2 px-4 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PicksVerification;
