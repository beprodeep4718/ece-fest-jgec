import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isSigningIn: false,
  isCheckingAuth: true,
  isFetchingEvents: false,
  userEvents: [],
  setAuthUser: (user) => set({ authUser: user }),
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/me");
      set({ authUser: res.data });
    } catch (error) {
      set({ authUser: null });
      console.error("Error checking authentication:", error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  register: async (userData) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/register", userData);
      set({ authUser: res.data });
      toast.success("Registration successful!");
    } catch (error) {
      console.error("Error signing up:", error);
      toast.error("Registration failed. Please try again.");
    } finally {
      set({ isSigningUp: false });
    }
  },
  login: async (credentials) => {
    set({ isSigningIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", credentials);
      set({ authUser: res.data });
      toast.success("Login successful!");
    } catch (error) {
      console.error("Error signing in:", error);
      toast.error(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
      set({ isSigningIn: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
    } catch (error) {
      console.error("Error signing out:", error);
    }
  },
  fetchEvents: async () => {
    try {
      set({ isFetchingEvents: true });
      const { authUser } = get();
      if (!authUser) return;
      const res = await axiosInstance.post("/events/by-ids", {
        ids: authUser.events,
      });
      set({ userEvents: res.data });
    } catch (error) {
      set({ userEvents: [] });
      console.error("Error fetching events:", error);
    } finally {
      set({ isFetchingEvents: false });
    }
  },
}));
