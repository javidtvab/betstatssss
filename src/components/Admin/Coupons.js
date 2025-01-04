import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Coupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [form, setForm] = useState({
    code: '',
    discountPercentage: '',
    expiryDate: '',
    isSingleUse: false
  });
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const response = await axios.get('/admin/coupons');
      setCoupons(response.data);
    } catch (error) {
      console.error('Error fetching coupons:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSaveCoupon = async (e) => {
    e.preventDefault();
    try {
      if (selectedCoupon) {
        await axios.put(`/admin/coupons/${selectedCoupon._id}`, form);
      } else {
        await axios.post('/admin/coupons', form);
      }
      fetchCoupons();
      setForm({ code: '', discountPercentage: '', expiryDate: '', isSingleUse: false });
      setSelectedCoupon(null);
    } catch (error) {
      console.error('Error saving coupon:', error);
    }
  };

  const handleEditCoupon = (coupon) => {
    setSelectedCoupon(coupon);
    setForm({
      code: coupon.code,
      discountPercentage: coupon.discountPercentage,
      expiryDate: coupon.expiryDate ? new Date(coupon.expiryDate).toISOString().split('T')[0] : '',
      isSingleUse: coupon.isSingleUse
    });
  };

  const handleDeleteCoupon = async (id) => {
    try {
      await axios.delete(`/admin/coupons/${id}`);
      fetchCoupons();
    } catch (error) {
      console.error('Error deleting coupon:', error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="text-xl font-bold mb-2">Gestión de Cupones de Descuento</h2>
      <form onSubmit={handleSaveCoupon}>
        <label className="block">
          Código:
          <input type="text" name="code" value={form.code} onChange={handleInputChange} className="mt-1 block w-full" required />
        </label>
        <label className="block mt-2">
          Porcentaje de Descuento:
          <input type="number" name="discountPercentage" value={form.discountPercentage} onChange={handleInputChange} className="mt-1 block w-full" required />
        </label>
        <label className="block mt-2">
          Fecha de Expiración:
          <input type="date" name="expiryDate" value={form.expiryDate} onChange={handleInputChange} className="mt-1 block w-full" />
        </label>
        <label className="block mt-2">
          ¿De un solo uso?
          <input type="checkbox" name="isSingleUse" checked={form.isSingleUse} onChange={handleInputChange} className="mt-1" />
        </label>
        <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Guardar Cambios</button>
      </form>

      <h3 className="text-lg font-bold mt-4">Cupones Existentes</h3>
      <table className="min-w-full bg-white mt-2">
        <thead>
          <tr>
            <th className="py-2">Código</th>
            <th className="py-2">Descuento</th>
            <th className="py-2">Fecha de Expiración</th>
            <th className="py-2">¿De un solo uso?</th>
            <th className="py-2">Usado</th>
            <th className="py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map(coupon => (
            <tr key={coupon._id}>
              <td className="py-2">{coupon.code}</td>
              <td className="py-2">{coupon.discountPercentage}%</td>
              <td className="py-2">{coupon.expiryDate ? new Date(coupon.expiryDate).toLocaleDateString() : 'N/A'}</td>
              <td className="py-2">{coupon.isSingleUse ? 'Sí' : 'No'}</td>
              <td className="py-2">{coupon.used ? 'Sí' : 'No'}</td>
              <td className="py-2">
                <button onClick={() => handleEditCoupon(coupon)} className="text-blue-500 ml-4">Editar</button>
                <button onClick={() => handleDeleteCoupon(coupon._id)} className="text-red-500 ml-4">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Coupons;
