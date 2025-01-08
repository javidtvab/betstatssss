import React, { useState } from "react";

const BasicProfile = () => {
  const [nickname, setNickname] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);

  const handlePhotoChange = (e) => {
    setProfilePhoto(URL.createObjectURL(e.target.files[0]));
  };

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para guardar los datos en el backend.
    console.log("Profile saved:", { nickname, profilePhoto });
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">Configuración del Perfil Básico</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label className="block text-sm font-medium">Foto de Perfil</label>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="mt-2"
          />
          {profilePhoto && (
            <img
              src={profilePhoto}
              alt="Preview"
              className="mt-2 w-32 h-32 object-cover rounded-full"
            />
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Nickname</label>
          <input
            type="text"
            value={nickname}
            onChange={handleNicknameChange}
            className="mt-2 p-2 border rounded w-full"
            placeholder="Escribe tu nickname"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default BasicProfile;
