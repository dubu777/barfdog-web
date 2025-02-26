import { create } from "zustand";
import { TemporaryUserEmail, TemporaryPassword } from "@/types";
import { LoginUserInfo, UserInfo } from "@/types";
import { getCookie } from "@/utils/cookie";
import { AUTH_CONFIG } from "@/constants/auth";

interface AuthStore {
  isLoggedIn: boolean;
  loginUserInfo: LoginUserInfo | null;
  setLoginUserInfo: (loginUserInfo: LoginUserInfo) => void;
  userInfo: UserInfo | null;
  setUserInfo: (userInfo: UserInfo) => void;
  tempEmailUserInfo: TemporaryUserEmail;
  setTempEmailUserInfo: (tempEmailUserInfo: TemporaryUserEmail) => void;
  tempPwUserInfo: TemporaryPassword | null;
  setTempPwUserInfo: (tempPwUserInfo: TemporaryPassword) => void;
}

const initialIsLoggedIn = getCookie(AUTH_CONFIG.ACCESS_TOKEN_COOKIE) ? true : false;

export const useAuthStore = create<AuthStore>((set) => ({
  isLoggedIn: initialIsLoggedIn,
  userInfo: null,
  loginUserInfo: null,
  setUserInfo: (userInfo) => {
    set({
      isLoggedIn: true,
      userInfo: userInfo,
    });
  },
  setLoginUserInfo: (loginUserInfo) => {
    set({
      loginUserInfo: loginUserInfo,
    });
  },
  tempEmailUserInfo: {
    email: "",
    provider: null,
  },
  setTempEmailUserInfo: (tempEmailUserInfo) => set({ tempEmailUserInfo }),
  tempPwUserInfo: {
    email: "",
    name: "",
    phoneNumber: "",
  },
  setTempPwUserInfo: (tempPwUserInfo) => set({ tempPwUserInfo }),
}));
