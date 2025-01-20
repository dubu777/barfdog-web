import { create } from "zustand";
import { UserInfoData } from "@/types/auth/user";
import { initialUserInfo } from "@/constants";
import { TemporaryUserEmail, TemporaryPassword } from "@/types/auth/findAccount";

interface AuthStore {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  userInfo: UserInfoData;
  setUserInfo: (userInfo: UserInfoData) => void;
  tempEmailUserInfo: TemporaryUserEmail;
  setTempEmailUserInfo: (tempEmailUserInfo: TemporaryUserEmail) => void;
  tempPwUserInfo: TemporaryPassword | null;
  setTempPwUserInfo: (tempPwUserInfo: TemporaryPassword) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isLoggedIn: true,
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
  userInfo: initialUserInfo,
  setUserInfo: (userInfo) => set({ userInfo }),
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