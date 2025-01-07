import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PremiumProfile = () => {
  const [profile, setProfile] = useState({});
  const [username, setUsername] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [socialMedia, setSocialMedia] = useState({
    twitter: '',
    facebook: '',
    instagram: '',
    linkedin: ''
  });
  const [description, setDescription] = useState('');
  const [statistics, setStatistics] = useState({});

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get('/api/premiumUser/profile');
      setProfile(response.data.user);
      setUsername(response.data.user.username);
      setSocialMedia(response.data.user.socialMedia || {});
      setDescription(response.data.user.description || '');
      setStatistics(response.data.statistics);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleFileChange = (e) => {
    setProfilePhoto(e.target.files[0]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSocialMedia({
      ...socialMedia,
      [name]: value
    });
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', username);
    formData.append('description', description);
    if (profilePhoto) {
      formData.append('profilePhoto', profilePhoto);
    }
    for (const [key, value] of Object.entries(socialMedia)) {
      formData.append(`socialMedia[${key}]`, value);
    }

    try {
      await axios.put('/api/premiumUser/profile', formData, {
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
        <label className="block mb-2">
          Descripción:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-lg" />
        </label>
        <label className="block mb-2">
          Twitter:
          <input type="text" name="twitter" value={socialMedia.twitter} onChange={handleInputChange} className="mt-1 block w-full border-gray-300 rounded-lg" />
        </label>
        <label className="block mb-2">
          Facebook:
          <input type="text" name="facebook" value={socialMedia.facebook} onChange={handleInputChange} className="mt-1 block w-full border-gray-300 rounded-lg" />
        </label>
        <label className="block mb-2">
          Instagram:
          <input type="text" name="instagram" value={socialMedia.instagram} onChange={handleInputChange} className="mt-1 block w-full border-gray-300 rounded-lg" />
        </label>
        <label className="block mb-2">
          LinkedIn:
          <input type="text" name="linkedin" value={socialMedia.linkedin} onChange={handleInputChange} className="mt-1 block w-full border-gray-300 rounded-lg" />
        </label>
        <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Guardar Cambios</button>
      </form>
      <div className="mt-4">
        <h3 className="text-lg font-bold mb-2">Estadísticas de Pronósticos</h3>
        <div className="mb-2">Número de Pronósticos: {statistics.numberOfPredictions}</div>
        <div className="mb-2">Stake Medio: {statistics.averageStake}</div>
        <div className="mb-2">Cuota Media: {statistics.averageOdds}</div>
        <div className="mb-2">% de Acierto: {statistics.winPercentage}%</div>
        <div className="mb-2">Unidades Ganadas: {statistics.totalUnitsWon}</div>
        <div className="mb-2">Deportes: {statistics.sports?.join(', ')}</div>
      </div>
    </div>
  );
};

export default PremiumProfile;
