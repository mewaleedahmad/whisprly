export const API_URL = import.meta.env.VITE_MODE === "development"
  ? "http://localhost:8000"
  : import.meta.env.VITE_API_URL;
