import React, { useState } from "react";

const PickForm = () => {
  const [stake, setStake] = useState("");
  const [odds, setOdds] = useState("");
  const [photo, setPhoto] = useState(null);

  const handlePhotoChange = (e) => {
    setPhoto(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para guardar el pick en el backend
    console.log("Pick creado:", { stake, odds, photo });
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">Crear un Nuevo Pick</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label className="block text-sm font-medium">Stake</label>
          <input
            type="number"
            value={stake}
            onChange={(e) => setStake(e.target.value)}
            className="mt-2 p-2 border rounded w-full"
            placeholder="Introduce el stake"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Cuota</label>
          <input
            type="number"
            step="0.01"
            value={odds}
            onChange={(e) => setOdds(e.target.value)}
            className="mt-2 p-2 border rounded w-full"
            placeholder="Introduce la cuota"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Foto</label>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="mt-2"
            required
          />
          {photo && (
            <img
              src={photo}
              alt="Preview"
              className="mt-2 w-32 h-32 object-cover"
            />
          )}
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Crear Pick
        </button>
      </form>
    </div>
  );
};

export default PickForm;
