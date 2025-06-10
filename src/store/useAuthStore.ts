import { create } from "zustand";
import { TemporaryUserEmail, TemporaryPassword } from "@/types";
import { LoginUserInfo, UserInfo } from "@/types";


interface AuthStore {
  loginUserInfo: LoginUserInfo | null;
  setLoginUserInfo: (loginUserInfo: LoginUserInfo) => void;
  userInfo: UserInfo | null;
  setUserInfo: (userInfo: UserInfo) => void;
  tempEmailUserInfo: TemporaryUserEmail;
  setTempEmailUserInfo: (tempEmailUserInfo: TemporaryUserEmail) => void;
  tempPwUserInfo: TemporaryPassword | null;
  setTempPwUserInfo: (tempPwUserInfo: TemporaryPassword) => void;
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
  clientLoggedIn: null,
  setClientLoggedIn: (loggedIn) => set({ clientLoggedIn: loggedIn }),
}));
