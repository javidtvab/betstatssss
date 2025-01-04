import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/admin/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleBlockUser = async (id) => {
    try {
      await axios.put(`/admin/users/${id}`, { isBlocked: true });
      fetchUsers();
    } catch (error) {
      console.error('Error blocking user:', error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`/admin/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleUpdateUser = async (id, updatedData) => {
    try {
      await axios.put(`/admin/users/${id}`, updatedData);
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="text-xl font-bold mb-2">Gestión de Usuarios</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Nombre de Usuario</th>
            <th className="py-2">Correo Electrónico</th>
            <th className="py-2">Rol</th>
            <th className="py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td className="py-2">{user.username}</td>
              <td className="py-2">{user.email}</td>
              <td className="py-2">{user.role}</td>
              <td className="py-2">
                <button onClick={() => handleBlockUser(user._id)} className="text-red-500">Bloquear</button>
                <button onClick={() => handleDeleteUser(user._id)} className="text-red-500 ml-4">Eliminar</button>
                <button onClick={() => setSelectedUser(user)} className="text-blue-500 ml-4">Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUser && (
        <div className="mt-4">
          <h3 className="text-lg font-bold">Editar Usuario</h3>
          <form onSubmit={(e) => {
            e.preventDefault();
            handleUpdateUser(selectedUser._id, selectedUser);
          }}>
            <label className="block">
              Nombre de Usuario:
              <input type="text" value={selectedUser.username} onChange={(e) => setSelectedUser({ ...selectedUser, username: e.target.value })} className="mt-1 block w-full" />
            </label>
            <label className="block mt-2">
              Correo Electrónico:
              <input type="email" value={selectedUser.email} onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })} className="mt-1 block w-full" />
            </label>
            <label className="block mt-2">
              Rol:
              <select value={selectedUser.role} onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })} className="mt-1 block w-full">
                <option value="basic">Básico</option>
                <option value="premium">Premium</option>
              </select>
            </label>
            <label className="block mt-2">
              Acceso al Bot:
              <input type="checkbox" checked={selectedUser.botAccess} onChange={(e) => setSelectedUser({ ...selectedUser, botAccess: e.target.checked })} className="mt-1" />
            </label>
            <label className="block mt-2">
              Estadísticas Mejoradas:
              <input type="checkbox" checked={selectedUser.enhancedStatistics} onChange={(e) => setSelectedUser({ ...selectedUser, enhancedStatistics: e.target.checked })} className="mt-1" />
            </label>
            <label className="block mt-2">
              Perfil Ampliado:
              <input type="checkbox" checked={selectedUser.extendedProfile} onChange={(e) => setSelectedUser({ ...selectedUser, extendedProfile: e.target.checked })} className="mt-1" />
            </label>
            <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Guardar Cambios</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
