const normalizeBaseUrl = (value) => (value ? value.replace(/\/+$/, "") : "");

const API_BASE_URL = normalizeBaseUrl(
  process.env.REACT_APP_API_BASE_URL ||
    (process.env.NODE_ENV === "development" ? "http://localhost:5000" : "")
);

export const buildApiUrl = (path) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
};
