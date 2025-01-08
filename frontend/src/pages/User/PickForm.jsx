import React, { useState } from "react";

const PickForm = () => {
  const [stake, setStake] = useState(""); // Estado para el stake
  const [odds, setOdds] = useState(""); // Estado para la cuota
  const [photo, setPhoto] = useState(null); // Estado para la foto
  const [previewPhoto, setPreviewPhoto] = useState(null); // Vista previa de la foto
  const [showModal, setShowModal] = useState(false); // Estado del modal
  const [loading, setLoading] = useState(false); // Estado de carga
  const [success, setSuccess] = useState(""); // Estado de éxito
  const [errors, setErrors] = useState([]); // Lista de errores

  // Validaciones avanzadas
  const validateFields = () => {
    const validationErrors = [];

    if (!stake || isNaN(stake) || stake <= 0) {
      validationErrors.push("El stake debe ser un número mayor a 0.");
    }

    if (!odds || isNaN(odds) || odds <= 1) {
      validationErrors.push("La cuota debe ser un número mayor a 1.");
    }

    if (photo) {
      const allowedTypes = ["image/jpeg", "image/png"];
      const maxSize = 2 * 1024 * 1024; // 2 MB
      if (!allowedTypes.includes(photo.type)) {
        validationErrors.push("La foto debe ser un archivo JPEG o PNG.");
      }
      if (photo.size > maxSize) {
        validationErrors.push("El archivo de la foto no puede superar los 2 MB.");
      }
    }

    setErrors(validationErrors);
    return validationErrors.length === 0;
  };

  // Manejar el cambio de la foto
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPreviewPhoto(URL.createObjectURL(file));
    }
  };

  // Mostrar el modal de confirmación
  const handleOpenModal = (e) => {
    e.preventDefault();
    setSuccess("");
    setErrors([]);

    if (!validateFields()) {
      return;
    }

    setShowModal(true);
  };

  // Cerrar el modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Enviar los datos al backend
  const handleConfirmSubmit = async () => {
    setShowModal(false);
    setLoading(true);
    setSuccess("");
    setErrors([]);

    const formData = new FormData();
    formData.append("stake", stake);
    formData.append("odds", odds);
    if (photo) {
      formData.append("photo", photo);
    }

    try {
      const response = await fetch("http://localhost:5000/api/picks", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error al crear el pick.");
      }

      setSuccess("¡Pick creado con éxito!");
      setStake("");
      setOdds("");
      setPhoto(null);
      setPreviewPhoto(null);
    } catch (err) {
      setErrors([err.message || "Hubo un problema al crear el pick."]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">Crear Nuevo Pick</h2>
      <form onSubmit={handleOpenModal}>
        {/* Stake */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Stake
          </label>
          <input
            type="number"
            value={stake}
            onChange={(e) => setStake(e.target.value)}
            placeholder="Introduce el stake"
            className="mt-2 p-2 border border-gray-300 rounded-md w-full focus:ring focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        {/* Cuota */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Cuota
          </label>
          <input
            type="number"
            step="0.01"
            value={odds}
            onChange={(e) => setOdds(e.target.value)}
            placeholder="Introduce la cuota"
            className="mt-2 p-2 border border-gray-300 rounded-md w-full focus:ring focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        {/* Foto */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Foto (opcional)
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
        </div>

        {/* Mensajes de Error */}
        {errors.length > 0 && (
          <div className="mb-4 text-sm text-red-500">
            <ul className="list-disc ml-4">
              {errors.map((err, index) => (
                <li key={index}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Mensajes de Éxito */}
        {success && <p className="text-sm text-green-500 mb-4">{success}</p>}

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
          {loading ? "Guardando..." : "Crear Pick"}
        </button>
      </form>

      {/* Modal de Confirmación */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-bold mb-4">Edita y Confirma tu Pick</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Stake
              </label>
              <input
                type="number"
                value={stake}
                onChange={(e) => setStake(e.target.value)}
                className="mt-2 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Cuota
              </label>
              <input
                type="number"
                step="0.01"
                value={odds}
                onChange={(e) => setOdds(e.target.value)}
                className="mt-2 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            {previewPhoto && (
              <div className="mb-4">
                <strong>Foto seleccionada:</strong>
                <img
                  src={previewPhoto}
                  alt="Vista previa"
                  className="w-16 h-16 mt-2 rounded-full object-cover"
                />
              </div>
            )}
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCloseModal}
                className="py-2 px-4 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmSubmit}
                className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PickForm;
