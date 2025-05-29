import axios from "axios";
import { LOGIN_URL } from "../constants";

export const login = async (email, password) => {
  try {
    const response = await axios.post(LOGIN_URL, { email, password });
    setToken(response.data.token);

    console.log("Login successful:", response.data);
    return true;
  } catch (error) {
    console.error("Login failed:", error);
    return false;
  }
};

// set token in localStorage
export const setToken = (token) => {
  if (token) {
    localStorage.setItem("superclip_authtoken", token);
  } else {
    localStorage.removeItem("superclip_authtoken");
  }
}
// get token from localStorage
export const getToken = () => {
  return localStorage.getItem("superclip_authtoken");
}

// clear token from localStorage
export const clearToken = () => {
  localStorage.removeItem("superclip_authtoken");
}

// check if user is authenticated
export const isAuthenticated = () => {
  const token = getToken();
  return !!token;
}