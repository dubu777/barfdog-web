import { create } from "zustand";

interface AuthStore {
  loginEmail: string | null;
  setSigninEmail: (email: string) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  loginEmail: null,
  setSigninEmail: (loginEmail) => set({ loginEmail }),
}));
