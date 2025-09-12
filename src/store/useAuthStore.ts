import { create } from "zustand";
import { LoginUserInfo, UserInfo } from "@/types";

interface AuthStore {
  loginUserInfo: LoginUserInfo | null;
  setLoginUserInfo: (loginUserInfo: LoginUserInfo) => void;
  userInfo: UserInfo | null;
  setUserInfo: (userInfo: UserInfo) => void;
  clientLoggedIn: boolean | null;
  setClientLoggedIn: (loggedIn: boolean | null) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  userInfo: null,
  loginUserInfo: null,
  setUserInfo: (userInfo) => {
    set({
      userInfo: userInfo,
    });
  },
  setLoginUserInfo: (loginUserInfo) => {
    set({
      loginUserInfo: loginUserInfo,
    });
  },
  clientLoggedIn: null,
  setClientLoggedIn: (loggedIn) => set({ clientLoggedIn: loggedIn }),
}));
