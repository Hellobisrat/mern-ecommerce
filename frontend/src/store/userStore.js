import { create } from "zustand";
import api from "../utils/api";

export const useUserStore = create((set, get) => ({
  user: null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,

  setUser: (user) => {
    console.log("Setting user:", user);
    set({ user });
  },

  setToken: (token) => {
    if (token) {
      localStorage.setItem("token", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      localStorage.removeItem("token");
      delete api.defaults.headers.common["Authorization"];
    }
    set({ token });
  },

  initialize: async () => {
    const token = get().token;
    if (!token) return;

    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    try {
      set({ loading: true });
      const { data } = await api.get("/users/profile");
      set({ user: data, loading: false });
    } catch (error) {
      console.error("Token invalid, clearing...",error);
      get().setToken(null);
      set({ user: null, loading: false });
    }
  },

  fetchProfile: async () => {
    try {
      set({ loading: true, error: null });
      const { data } = await api.get("/users/profile");
      set({ user: data, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to load profile",
        loading: false,
      });
    }
  },

  login: async (email, password) => {
    try {
      set({ loading: true, error: null });
      const { data } = await api.post("/users/login", { email, password });

      get().setToken(data.token);
      set({ user: data.user, loading: false });

      return true;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Login failed",
        loading: false,
      });
      return false;
    }
  },

  register: async (payload) => {
    try {
      set({ loading: true, error: null });
      const { data } = await api.post("/users/register", payload);

      get().setToken(data.token);
      set({ user: data.user, loading: false });

      return true;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Registration failed",
        loading: false,
      });
      return false;
    }
  },

  logout: async () => {
    try {
      await api.post("/users/logout");
    } finally {
      get().setToken(null);
      set({ user: null });
    }
  },
}));