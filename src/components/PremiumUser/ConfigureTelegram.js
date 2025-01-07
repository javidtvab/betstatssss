import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ConfigureTelegram = () => {
  const [telegramChannel, setTelegramChannel] = useState('');
  const [telegramBotToken, setTelegramBotToken] = useState('');

  useEffect(() => {
    fetchTelegramConfig();
  }, []);

  const fetchTelegramConfig = async () => {
    try {
      const response = await axios.get('/api/premiumUser/profile');
      setTelegramChannel(response.data.telegramChannel || '');
      setTelegramBotToken(response.data.telegramBotToken || '');
    } catch (error) {
      console.error('Error fetching Telegram config:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/api/premiumUser/configure-telegram', { telegramChannel, telegramBotToken });
      alert('Configuración de Telegram actualizada con éxito');
    } catch (error) {
      console.error('Error updating Telegram config:', error);
      alert('Error actualizando la configuración de Telegram');
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="text-xl font-bold mb-2">Configurar Canal de Telegram</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          Canal de Telegram:
          <input type="text" value={telegramChannel} onChange={(e) => setTelegramChannel(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-lg" required />
        </label>
        <label className="block mb-2">
          Token del Bot de Telegram:
          <input type="text" value={telegramBotToken} onChange={(e) => setTelegramBotToken(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-lg" required />
        </label>
        <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Guardar Configuración</button>
      </form>
    </div>
  );
};

export default ConfigureTelegram;
