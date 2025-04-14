import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useEventRegStore = create((set) => ({
  isRegistrationLoading: false,
  registrationIndividual: async (eventId) => {
    set({ isRegistrationLoading: true });
    try {
      const res = await axiosInstance.post("/registration/individual", {
        eventId,
      });
      toast.success(res.data.message);
      if (res.status === 201) {
        const { authUser } = useAuthStore.getState();
        const updatedUser = {
          ...authUser,
          events: [...authUser.events, eventId],
        };
        useAuthStore.setState({ authUser: updatedUser });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed.");
      console.error(error);
    } finally {
      set({ isRegistrationLoading: false });
    }
  },
  registrationTeam: async (eventId, teamName, memberIds) => {
    set({ isRegistrationLoading: true });
    try {
      const res = await axiosInstance.post("/registration/team", {
        eventId,
        teamName,
        memberIds,
      });
      toast.success(res.data.message);
      if (res.status === 201) {
        const { authUser } = useAuthStore.getState();
        const updatedUser = {
          ...authUser,
          events: [...authUser.events, eventId],
        };
        useAuthStore.setState({ authUser: updatedUser });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed.");
      console.error(error);
    } finally {
      set({ isRegistrationLoading: false });
    }
  },
}));
