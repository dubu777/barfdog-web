import { create } from "zustand";

interface AuthStore {
  loginEmail: string | null;
  setLoginEmail: (email: string) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  loginEmail: null,
  setLoginEmail: (loginEmail) => set({ loginEmail }),
}));
