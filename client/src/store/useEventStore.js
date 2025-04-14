import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useEventStore = create((set) => ({
  events: [],
  isEventLoading: false,
  event: null,
  getAllEvents: async () => {
    set({ isEventLoading: true });
    try {
      const res = await axiosInstance.get("/events/");
      set({ events: res.data });
    } catch (error) {
      console.error("Error fetching events:", error);
      set({ isEventLoading: false });
    } finally {
      set({ isEventLoading: false });
    }
  },
  getEvent: async (id) => {
    set({ isEventLoading: true });
    try {
      const res = await axiosInstance.get(`/events/${id}`);
      set({ event: res.data });
    } catch (error) {
      console.error("Error fetching event:", error);
    } finally {
      set({ isEventLoading: false });
    }
  },
}));
