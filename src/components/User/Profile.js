import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [username, setUsername] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get('/api/user/profile');
      setProfile(response.data);
      setUsername(response.data.username);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleFileChange = (e) => {
    setProfilePhoto(e.target.files[0]);
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', username);
    if (profilePhoto) {
      formData.append('profilePhoto', profilePhoto);
    }

    try {
      await axios.put('/api/user/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      fetchProfile();
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="text-xl font-bold mb-2">Configuración de Perfil</h2>
      <form onSubmit={handleSaveProfile}>
        <label className="block mb-2">
          Nombre de Usuario:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-lg" required />
        </label>
        <label className="block mb-2">
          Foto de Perfil:
          <input type="file" onChange={handleFileChange} className="mt-1 block w-full border-gray-300 rounded-lg" />
        </label>
        {profile.profilePhoto && (
          <div className="mt-4">
            <img src={profile.profilePhoto} alt="Foto de Perfil" className="h-20 w-20 rounded-full" />
          </div>
        )}
        <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default Profile;
