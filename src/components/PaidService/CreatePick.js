import React, { useState } from 'react';
import axios from 'axios';

const CreatePick = () => {
  const [type, setType] = useState('live');
  const [stake, setStake] = useState('');
  const [odds, setOdds] = useState('');
  const [isFree, setIsFree] = useState(true);
  const [price, setPrice] = useState('');
  const [photo, setPhoto] = useState(null);
  const [betId, setBetId] = useState(''); // ID de la apuesta seleccionada desde la API
  const [betDetails, setBetDetails] = useState(null); // Detalles de la apuesta obtenidos desde la API

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleGetBetDetails = async () => {
    try {
      const response = await axios.get(`/api/paidService/bet/${betId}`);
      setBetDetails(response.data);
    } catch (error) {
      console.error('Error fetching bet details:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('type', type);
    formData.append('stake', stake);
    formData.append('odds', odds);
    formData.append('isFree', isFree);
    formData.append('price', isFree ? 0 : price);
    formData.append('photo', photo);
    formData.append('betId', betId);

    try {
      await axios.post('/api/paidService/create-pick', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      // Reset form fields after submission
      setType('live');
      setStake('');
      setOdds('');
      setIsFree(true);
      setPrice('');
      setPhoto(null);
      setBetId('');
      setBetDetails(null);
    } catch (error) {
      console.error('Error creating pick:', error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="text-xl font-bold mb-2">Crear Pick</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          Tipo:
          <select value={type} onChange={(e) => setType(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-lg">
            <option value="live">En Vivo</option>
            <option value="pre-match">Pre-partido</option>
          </select>
        </label>
        <label className="block mb-2">
          ID de la Apuesta:
          <input type="text" value={betId} onChange={(e) => setBetId(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-lg" required />
          <button type="button" onClick={handleGetBetDetails} className="mt-2 bg-blue-500 text-white py-2 px-4 rounded">Buscar Apuesta</button>
        </label>
        {betDetails && (
          <>
            <p className="mb-2">Descripción: {betDetails.description}</p>
            <p className="mb-2">Deporte: {betDetails.sport}</p>
            <p className="mb-2">Casa de Apuestas: {betDetails.bookie}</p>
            <p className="mb-2">Fecha del Evento: {betDetails.event_date}</p>
            <p className="mb-2">Hora del Evento: {betDetails.event_time}</p>
            <p className="mb-2">Evento: {betDetails.event}</p>
            <p className="mb-2">Liga: {betDetails.league}</p>
          </>
        )}
        <label className="block mb-2">
          Stake:
          <input type="number" value={stake} onChange={(e) => setStake(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-lg" required />
        </label>
        <label className="block mb-2">
          Cuota:
          <input type="number" value={odds} onChange={(e) => setOdds(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-lg" required />
        </label>
        <label className="block mb-2">
          Foto:
          <input type="file" onChange={handleFileChange} className="mt-1 block w-full border-gray-300 rounded-lg" required />
        </label>
        <label className="block mb-2">
          Gratuito:
          <input type="checkbox" checked={isFree} onChange={(e) => setIsFree(e.target.checked)} className="mt-1 block" />
        </label>
        {!isFree && (
          <label className="block mb-2">
            Precio:
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-lg" required />
          </label>
        )}
        <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Crear Pick</button>
      </form>
    </div>
  );
};

export default CreatePick;
