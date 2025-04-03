import axios from "axios";

const API_URL = "http://localhost:1234/api";

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const loginUser = (data) => api.post("/auth/login", data);
export const registerUser = (data) => api.post("/auth/register", data);
export const logoutUser = () => api.post("/auth/logout");
export const getProfile = () => api.get("/auth/profile");
export const getBooks = () => api.get("/books");
