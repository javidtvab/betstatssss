import React, { useState, useEffect } from "react";

const ManagePremium = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/admin/users");
        if (!response.ok) throw new Error("Error al cargar los usuarios.");
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const togglePremium = async (userId, isPremium) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/users/${userId}/premium`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ premium: !isPremium }),
      });

      if (!response.ok) throw new Error("Error al cambiar el estado premium.");

      setUsers((prev) =>
        prev.map((user) =>
          user.id === userId ? { ...user, premium: !isPremium } : user
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <p className="text-center">Cargando usuarios...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Gestión de Usuarios Premium</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr>
              <th className="border-b py-2 px-4">Usuario</th>
              <th className="border-b py-2 px-4">Email</th>
              <th className="border-b py-2 px-4">Estado Premium</th>
              <th className="border-b py-2 px-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border-b py-2 px-4">{user.name}</td>
                <td className="border-b py-2 px-4">{user.email}</td>
                <td className="border-b py-2 px-4">
                  {user.premium ? "Premium" : "Básico"}
                </td>
                <td className="border-b py-2 px-4">
                  <button
                    onClick={() => togglePremium(user.id, user.premium)}
                    className={`py-1 px-3 rounded-lg ${
                      user.premium
                        ? "bg-red-500 text-white hover:bg-red-600"
                        : "bg-green-500 text-white hover:bg-green-600"
                    }`}
                  >
                    {user.premium ? "Revocar Premium" : "
