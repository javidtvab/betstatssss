import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PaymentGatewayConfiguration = () => {
  const [configuration, setConfiguration] = useState({});
  const [form, setForm] = useState({
    paypal: {
      clientId: '',
      clientSecret: '',
      enabled: true
    },
    stripe: {
      apiKey: '',
      enabled: true
    }
  });

  useEffect(() => {
    fetchConfiguration();
  }, []);

  const fetchConfiguration = async () => {
    try {
      const response = await axios.get('/admin/payment-gateway-configuration');
      setConfiguration(response.data);
      setForm(response.data);
    } catch (error) {
      console.error('Error fetching payment gateway configuration:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const [gateway, field] = name.split('.');
    setForm(prevForm => ({
      ...prevForm,
      [gateway]: {
        ...prevForm[gateway],
        [field]: type === 'checkbox' ? checked : value
      }
    }));
  };

  const handleSaveConfiguration = async (e) => {
    e.preventDefault();
    try {
      if (configuration._id) {
        await axios.put(`/admin/payment-gateway-configuration/${configuration._id}`, form);
      } else {
        await axios.post('/admin/payment-gateway-configuration', form);
      }
      fetchConfiguration();
    } catch (error) {
      console.error('Error saving payment gateway configuration:', error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="text-xl font-bold mb-2">Configuración de Pasarelas de Pago</h2>
      <form onSubmit={handleSaveConfiguration}>
        <h3 className="text-lg font-bold mt-4">PayPal</h3>
        <label className="block">
          Client ID:
          <input type="text" name="paypal.clientId" value={form.paypal.clientId} onChange={handleInputChange} className="mt-1 block w-full" required />
        </label>
        <label className="block mt-2">
          Client Secret:
          <input type="text" name="paypal.clientSecret" value={form.paypal.clientSecret} onChange={handleInputChange} className="mt-1 block w-full" required />
        </label>
        <label className="block mt-2">
          Habilitado:
          <input type="checkbox" name="paypal.enabled" checked={form.paypal.enabled} onChange={handleInputChange} className="mt-1" />
        </label>

        <h3 className="text-lg font-bold mt-4">Stripe</h3>
        <label className="block">
          API Key:
          <input type="text" name="stripe.apiKey" value={form.stripe.apiKey} onChange={handleInputChange} className="mt-1 block w-full" required />
        </label>
        <label className="block mt-2">
          Habilitado:
          <input type="checkbox" name="stripe.enabled" checked={form.stripe.enabled} onChange={handleInputChange} className="mt-1" />
        </label>

        <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default PaymentGatewayConfiguration;
