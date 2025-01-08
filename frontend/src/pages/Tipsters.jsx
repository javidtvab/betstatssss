filteredTipsters.length / itemsPerPage)}
          className="py-2 px-4 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed"
        >
          Siguiente
        </button>
      </div>

      {/* Detalles del Tipster */}
      {selectedTipster && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-bold mb-4">Detalles del Tipster</h3>
          <p>
            <strong>Nombre:</strong> {selectedTipster.name}
          </p>
          <p>
            <strong>ROI (%):</strong> {selectedTipster.roi}
          </p>
          <p>
            <strong>Unidades Ganadas:</strong> {selectedTipster.unitsWon}
          </p>
          <p>
            <strong>Total de Picks:</strong> {selectedTipster.totalPicks}
          </p>
          <button
            onClick={() => setSelectedTipster(null)}
            className="mt-4 py-2 px-4 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
          >
            Cerrar
          </button>
        </div>
      )}

      {/* Comparación de Tipsters */}
      {comparison.first && comparison.second && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-bold mb-4">Comparación de Tipsters</h3>
          <p>
            <strong>Primero:</strong> {tipsters.find((t) => t.id === comparison.first)?.name}
          </p>
          <p>
            <strong>Segundo:</strong> {tipsters.find((t) => t.id === comparison.second)?.name}
          </p>
          <button
            onClick={saveComparison}
            className="mt-4 py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Guardar Comparación
          </button>
        </div>
      )}

      {/* Historial de Comparaciones */}
      <div className="mt-6 bg-gray-100 p-4 rounded-lg">
        <h3 className="text-lg font-bold mb-4">Historial de Comparaciones</h3>
        {comparisonHistory.length > 0 ? (
          <ul>
            {comparisonHistory.map((entry, index) => (
              <li key={index} className="mb-2">
                <strong>{entry.date}:</strong> {entry.first.name} vs {entry.second.name}
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay comparaciones guardadas.</p>
        )}
      </div>
    </div>
  );
};

export default Tipsters;
