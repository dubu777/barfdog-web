import {create} from "zustand";
import {initialUserInfo, UserInfoData} from "@/types/user";

interface AuthStore {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  userInfo: UserInfoData;
  setUserInfo: (userInfo: UserInfoData) => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  isLoggedIn: true,
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
  userInfo: initialUserInfo,
  setUserInfo: (userInfo) => set({ userInfo }),
}))