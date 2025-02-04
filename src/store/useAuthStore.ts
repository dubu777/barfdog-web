import { create } from "zustand";
import { TemporaryUserEmail, TemporaryPassword } from "@/types/auth/findAccount";
import { LoginUserInfo, UserInfo } from "@/types";

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

export const useAuthStore = create<AuthStore>((set) => ({
  isLoggedIn: false,
  userInfo: null,
  loginUserInfo: null,
  setUserInfo: (userInfo) => {
    set({
      isLoggedIn: true,
      userInfo: userInfo,
    })
  },
  setLoginUserInfo: (loginUserInfo) => {
    set({
      loginUserInfo: loginUserInfo,
    })
  },
  tempEmailUserInfo: {
    email: '',
    provider: null,
  },
  setTempEmailUserInfo: (tempEmailUserInfo) => set({ tempEmailUserInfo }),
  tempPwUserInfo: {
    email: '',
    name: '',
    phoneNumber: '',
  },
  setTempPwUserInfo: (tempPwUserInfo) => set({ tempPwUserInfo }),
}))