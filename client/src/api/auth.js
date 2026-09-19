// src/api/auth.js
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const signup = async (userData) => {
  const response = await fetch(`${API_URL}/api/users/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Signup failed");
  }
  return data;
};

export const login = async (email, password) => {
  const response = await fetch(`${API_URL}/api/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }
  return data;
};

export const verifyEmail = async (token) => {
  const response = await fetch(
    `${API_URL}/api/users/verify-email?token=${token}`,
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Verification failed");
  }
  return data;
};
