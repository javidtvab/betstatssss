import React, { useState, useEffect } from "react";

const BasicProfile = () => {
  const [nickname, setNickname] = useState(""); // Estado para el nickname
  const [profilePhoto, setProfilePhoto] = useState(null); // Estado para la foto de perfil
  const [previewPhoto, setPreviewPhoto] = useState(null); // Vista previa de la foto
  const [loading, setLoading] = useState(false); // Estado de carga
  const [error, setError] = useState(""); // Estado de errores
  const [success, setSuccess] = useState(""); // Estado de éxito

  // Cargar datos existentes del usuario al iniciar
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users/1");
        const data = await response.json();
        setNickname(data.nickname);
        if (data.profilePhoto) {
          setPreviewPhoto(data.profilePhoto);
        }
      } catch (err) {
        setError("Error al cargar los datos del perfil.");
      }
    };
    fetchProfile();
  }, []);

  // Maneja el cambio de la foto de perfil con validación de tamaño y tipo
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setError("No se seleccionó ningún archivo.");
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      setError("Solo se permiten archivos JPEG y PNG.");
      return;
    }

    const maxSize = 2 * 1024 * 1024; // 2 MB
    if (file.size > maxSize) {
      setError("El archivo debe ser menor a 2 MB.");
      return;
    }

    setError(""); // Limpiar errores
    setProfilePhoto(file);
    setPreviewPhoto(URL.createObjectURL(file)); // Generar vista previa
  };

  // Maneja el cambio del nickname
  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  // Enviar datos al backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    const formData = new FormData();
    formData.append("nickname", nickname);
    if (profilePhoto) {
      formData.append("profilePhoto", profilePhoto);
    }

    try {
      const response = await fetch("http://localhost:5000/api/users/update", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el perfil.");
      }

      setSuccess("¡Perfil actualizado con éxito!");
    } catch (err) {
      setError("Hubo un problema al actualizar tu perfil.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">Configura tu Perfil</h2>
      <form onSubmit={handleSubmit}>
        {/* Foto de Perfil */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Foto de Perfil
          </label>
          <div className="mt-2 flex items-center">
            {previewPhoto ? (
              <img
                src={previewPhoto}
                alt="Vista previa"
                className="w-16 h-16 rounded-full object-cover mr-4"
              />
            ) : (
              <div className="w-16 h-16 bg-gray-200 rounded-full mr-4 flex items-center justify-center">
                <span className="text-gray-500">No Image</span>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
            />
          </div>
          {error && (
            <p className="text-sm text-red-500 mt-1">{error}</p>
          )}
        </div>

        {/* Nickname */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Nickname
          </label>
          <input
            type="text"
            value={nickname}
            onChange={handleNicknameChange}
            placeholder="Escribe tu nickname"
            className="mt-2 p-2 border border-gray-300 rounded-md w-full focus:ring focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        {/* Mensajes de Éxito y Error */}
        {success && (
          <p className="text-sm text-green-500 mb-4">{success}</p>
        )}
        {error && (
          <p className="text-sm text-red-500 mb-4">{error}</p>
        )}

        {/* Botón de Guardar */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 font-semibold rounded-lg ${
            loading
              ? "bg-gray-500 text-gray-200"
              : "bg-blue-600 text-white hover:bg-blue-700 focus:ring focus:ring-blue-500"
          }`}
        >
          {loading ? "Guardando..." : "Guardar Cambios"}
        </button>
      </form>
    </div>
  );
};

export default BasicProfile;
