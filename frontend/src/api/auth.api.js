import axiosPublic from "./axios";

export const registerUser = async (userData) => {
  const response = await axiosPublic.post("/auth/register", userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await axiosPublic.post("/auth/login", credentials);
  return response.data;
};

export const refresh = async () => {
  const response = await axiosPublic.post("/auth/refreshToken");
  return response.data;
};

export const logout = async () => {
  const response = await axiosPublic.post("/auth/logout");
  return response.data;
};