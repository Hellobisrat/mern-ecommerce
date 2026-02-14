import { create } from "zustand";
import api from "../utils/api";

export const useUserStore = create((set) => ({
  user: null,
  loading: false,
  error: null,

  setUser: (user) => set({ user }),

  fetchProfile: async () => {
    try {
      set({ loading: true, error: null });
      const { data } = await api.get("/users/profile");
      set({ user: data, loading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || "Failed to load profile", loading: false });
    }
  },

  login: async (email, password) => {
    try {
      set({ loading: true, error: null });
      const { data } = await api.post("/users/login", { email, password });
      set({ user: data, loading: false });
      return true;
    } catch (error) {
      set({ error: error.response?.data?.message || "Login failed", loading: false });
      return false;
    }
  },

  register: async (payload) => {
    try {
      set({ loading: true, error: null });
      const { data } = await api.post("/users/register", payload);
      set({ user: data, loading: false });
      return true;
    } catch (error) {
      set({ error: error.response?.data?.message || "Registration failed", loading: false });
      return false;
    }
  },

  logout: async () => {
    try {
      await api.post("/users/logout");
    } finally {
      set({ user: null });
    }
  },
}));