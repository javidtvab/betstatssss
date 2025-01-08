import React, { useState } from 'react';

const BasicUserProfile = () => {
  const [nick, setNick] = useState('Usuario');
  const [photo, setPhoto] = useState(null);

  const handleNickChange = (e) => {
    setNick(e.target.value);
  };

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar el envío de los datos del perfil al servidor
    alert('Perfil actualizado');
  };

  return (
    <div>
      <h1>Perfil de Usuario Básico</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nick:</label>
          <input type="text" value={nick} onChange={handleNickChange} />
        </div>
        <div>
          <label>Foto:</label>
          <input type="file" onChange={handlePhotoChange} />
        </div>
        {photo && (
          <div>
            <img src={photo} alt="Foto de perfil" width="100" height="100" />
          </div>
        )}
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default BasicUserProfile;
