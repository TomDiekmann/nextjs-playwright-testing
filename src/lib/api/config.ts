export const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api"
    : "http://localhost:3000/api";
