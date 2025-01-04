import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ApiConfiguration = () => {
  const [configuration, setConfiguration] = useState({});
  const [form, setForm] = useState({
    apiKey: '',
    endpoint: '',
    enabled: true
  });

  useEffect(() => {
    fetchConfiguration();
  }, []);

  const fetchConfiguration = async () => {
    try {
      const response = await axios.get('/admin/api-configuration');
      setConfiguration(response.data);
      setForm(response.data);
    } catch (error) {
      console.error('Error fetching API configuration:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSaveConfiguration = async (e) => {
    e.preventDefault();
    try {
      if (configuration._id) {
        await axios.put(`/admin/api-configuration/${configuration._id}`, form);
      } else {
        await axios.post('/admin/api-configuration', form);
      }
      fetchConfiguration();
    } catch (error) {
      console.error('Error saving API configuration:', error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="text-xl font-bold mb-2">Configuración API es.betsapi.com</h2>
      <form onSubmit={handleSaveConfiguration}>
        <label className="block">
          API Key:
          <input type="text" name="apiKey" value={form.apiKey} onChange={handleInputChange} className="mt-1 block w-full" required />
        </label>
        <label className="block mt-2">
          Endpoint:
          <input type="text" name="endpoint" value={form.endpoint} onChange={handleInputChange} className="mt-1 block w-full" required />
        </label>
        <label className="block mt-2">
          Habilitado:
          <input type="checkbox" name="enabled" checked={form.enabled} onChange={handleInputChange} className="mt-1" />
        </label>
        <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default ApiConfiguration;
