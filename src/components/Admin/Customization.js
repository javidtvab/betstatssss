import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Customization = () => {
  const [configuration, setConfiguration] = useState({});
  const [form, setForm] = useState({
    siteTitle: '',
    siteDescription: '',
    primaryColor: '',
    secondaryColor: '',
    logoUrl: '',
    footerText: ''
  });

  useEffect(() => {
    fetchConfiguration();
  }, []);

  const fetchConfiguration = async () => {
    try {
      const response = await axios.get('/admin/configurations');
      setConfiguration(response.data);
      setForm(response.data);
    } catch (error) {
      console.error('Error fetching configuration:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSaveConfiguration = async (e) => {
    e.preventDefault();
    try {
      if (configuration._id) {
        await axios.put(`/admin/configurations/${configuration._id}`, form);
      } else {
        await axios.post('/admin/configurations', form);
      }
      fetchConfiguration();
    } catch (error) {
      console.error('Error saving configuration:', error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="text-xl font-bold mb-2">Customización de la Web</h2>
      <form onSubmit={handleSaveConfiguration}>
        <label className="block">
          Título del Sitio:
          <input type="text" name="siteTitle" value={form.siteTitle} onChange={handleInputChange} className="mt-1 block w-full" required />
        </label>
        <label className="block mt-2">
          Descripción del Sitio:
          <input type="text" name="siteDescription" value={form.siteDescription} onChange={handleInputChange} className="mt-1 block w-full" required />
        </label>
        <label className="block mt-2">
          Color Primario:
          <input type="color" name="primaryColor" value={form.primaryColor} onChange={handleInputChange} className="mt-1 block w-full" required />
        </label>
        <label className="block mt-2">
          Color Secundario:
          <input type="color" name="secondaryColor" value={form.secondaryColor} onChange={handleInputChange} className="mt-1 block w-full" required />
        </label>
        <label className="block mt-2">
          URL del Logo:
          <input type="url" name="logoUrl" value={form.logoUrl} onChange={handleInputChange} className="mt-1 block w-full" required />
        </label>
        <label className="block mt-2">
          Texto del Pie de Página:
          <input type="text" name="footerText" value={form.footerText} onChange={handleInputChange} className="mt-1 block w-full" required />
        </label>
        <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default Customization;
