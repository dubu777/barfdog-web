import { create } from "zustand";

interface AuthStore {
  signinEmail: string | null;
  setSigninEmail: (email: string) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  signinEmail: null,
  setSigninEmail: (signinEmail) => set({ signinEmail }),
}));
