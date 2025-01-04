import React, { useState } from 'react';
import axios from 'axios';

const CreatePick = () => {
  const [stake, setStake] = useState('');
  const [odds, setOdds] = useState('');
  const [photo, setPhoto] = useState(null);

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleCreatePick = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('stake', stake);
    formData.append('odds', odds);
    formData.append('photo', photo);

    try {
      await axios.post('/api/user/picks', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      // Opcional: Resetea el formulario después de crear un nuevo pick
      setStake('');
      setOdds('');
      setPhoto(null);
    } catch (error) {
      console.error('Error creating pick:', error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="text-xl font-bold mb-2">Crear Nuevo Pick</h2>
      <form onSubmit={handleCreatePick}>
        <label className="block mb-2">
          Stake:
          <input type="number" value={stake} onChange={(e) => setStake(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-lg" required />
        </label>
        <label className="block mb-2">
          Cuota:
          <input type="number" step="0.01" value={odds} onChange={(e) => setOdds(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-lg" required />
        </label>
        <label className="block mb-2">
          Foto:
          <input type="file" onChange={handleFileChange} className="mt-1 block w-full border-gray-300 rounded-lg" required />
        </label>
        <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Crear Pick</button>
      </form>
    </div>
  );
};

export default CreatePick;
