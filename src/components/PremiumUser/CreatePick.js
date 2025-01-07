import React, { useState } from 'react';
import axios from 'axios';

const CreatePick = () => {
  const [type, setType] = useState('live');
  const [stake, setStake] = useState('');
  const [odds, setOdds] = useState('');
  const [isFree, setIsFree] = useState(true);
  const [price, setPrice] = useState('');
  const [photo, setPhoto] = useState(null);
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [event, setEvent] = useState('');
  const [argument, setArgument] = useState('');
  const [league, setLeague] = useState('');

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
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
    if (type === 'pre-match') {
      formData.append('eventDate', eventDate);
      formData.append('eventTime', eventTime);
      formData.append('event', event);
      formData.append('argument', argument);
      formData.append('league', league);
    }

    try {
      await axios.post('/api/premiumUser/picks', formData, {
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
      setEventDate('');
      setEventTime('');
      setEvent('');
      setArgument('');
      setLeague('');
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
        {type === 'pre-match' && (
          <>
            <label className="block mb-2">
              Fecha del Evento:
              <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-lg" required />
            </label>
            <label className="block mb-2">
              Hora del Evento:
              <input type="time" value={eventTime} onChange={(e) => setEventTime(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-lg" required />
            </label>
            <label className="block mb-2">
              Evento:
              <input type="text" value={event} onChange={(e) => setEvent(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-lg" required />
            </label>
            <label className="block mb-2">
              Argumento:
              <textarea value={argument} onChange={(e) => setArgument(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-lg" />
            </label>
            <label className="block mb-2">
              Liga:
              <input type="text" value={league} onChange={(e) => setLeague(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-lg" />
            </label>
          </>
        )}
        <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Crear Pick</button>
      </form>
    </div>
  );
};

export default CreatePick;
