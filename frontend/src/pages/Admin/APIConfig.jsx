const baseURLs = {
  development: "http://localhost:5000/api",
  staging: "https://staging.example.com/api",
  production: "https://api.example.com",
};

const APIConfig = {
  baseURL: baseURLs[process.env.NODE_ENV || "development"], // Seleccionar URL base según el entorno
  endpoints: {
    // Endpoints relacionados con los usuarios
    users: {
      list: "/users", // Obtener todos los usuarios
      details: (id) => `/users/${id}`, // Detalles de un usuario
      stats: (id) => `/users/${id}/stats`, // Estadísticas de un usuario
      updateStatus: (id) => `/users/${id}/status`, // Actualizar el estado de un usuario
    },
    // Endpoints relacionados con los picks
    picks: {
      list: "/picks", // Obtener todos los picks
      update: (id) => `/picks/${id}`, // Actualizar un pick
      bulkUpdate: "/picks/bulk", // Actualizar múltiples picks
    },
    // Endpoints relacionados con los planes de suscripción
    subscriptionPlans: {
      list: "/subscription-plans", // Obtener todos los planes
      create: "/subscription-plans", // Crear un nuevo plan
      update: (id) => `/subscription-plans/${id}`, // Actualizar un plan existente
      delete: (id) => `/subscription-plans/${id}`, // Eliminar un plan
    },
    // Otros endpoints
    dashboard: "/dashboard", // Métricas generales del sistema
  },
  defaultHeaders: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token") || ""}`, // Autenticación con token
  },
};

// Caché para solicitudes
const cache = new Map();

// Manejador de errores
const handleErrors = (status) => {
  if (status === 401) {
    console.error("No autorizado. Redirigiendo al inicio de sesión...");
    window.location.href = "/login";
  } else if (status >= 500) {
    console.error("Error del servidor. Intenta de nuevo más tarde.");
  }
};

// Retrasos y reintentos automáticos
const retryRequest = async (fn, retries = 3, delay = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i < retries - 1) {
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        throw error;
      }
    }
  }
};

// Función para realizar solicitudes HTTP con todas las mejoras
export const apiRequest = async (endpoint, method = "GET", body = null, headers = {}) => {
  const cacheKey = `${method}:${endpoint}:${JSON.stringify(body)}`;

  // Verificar en caché
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  return retryRequest(async () => {
    try {
      const response = await fetch(`${APIConfig.baseURL}${endpoint}`, {
        method,
        headers: { ...APIConfig.defaultHeaders, ...headers },
        body: body ? JSON.stringify(body) : null,
      });

      if (!response.ok) {
        handleErrors(response.status);
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      cache.set(cacheKey, data); // Guardar en caché
      return data;
    } catch (error) {
      console.error("API Request Error:", error);
      throw error;
    }
  });
};

// Función para construir un endpoint dinámico
export const buildEndpoint = (endpoint, params = {}) => {
  let finalEndpoint = endpoint;
  for (const [key, value] of Object.entries(params)) {
    finalEndpoint = finalEndpoint.replace(`:${key}`, value);
  }
  return finalEndpoint;
};

// WebSockets (si aplica)
export const connectWebSocket = (path, onMessage, onClose, onError) => {
  const socket = new WebSocket(`${APIConfig.baseURL.replace(/^http/, "ws")}${path}`);

  socket.onmessage = onMessage;
  socket.onclose = onClose;
  socket.onerror = onError;

  return socket;
};

export default APIConfig;
