import {create} from "zustand";

interface CommonStore {
  isOpenSideNavBar: boolean;
  setIsOpenSideNavBar: () => void;
}
export const useCommonStore = create<CommonStore>((set) => ({
  isOpenSideNavBar: false,
  setIsOpenSideNavBar: () => set((state) => ({ isOpenSideNavBar: !state.isOpenSideNavBar })),
}))