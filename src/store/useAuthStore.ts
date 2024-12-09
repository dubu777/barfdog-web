import {create} from "zustand";
import {UserInfoData} from "@/types/user";
import {initialUserInfo} from "@/constants";

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