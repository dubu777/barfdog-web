import {create} from "zustand";

interface CommonState {
  isOpenSideNavBar: boolean;
  setIsOpenSideNavBar: () => void;
}
export const useCommonStore = create<CommonState>((set) => ({
  isOpenSideNavBar: false,
  setIsOpenSideNavBar: () => set((state) => ({ isOpenSideNavBar: !state.isOpenSideNavBar })),
}))