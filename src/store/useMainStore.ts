import {create} from "zustand";

export type SelectedHealthType = {
  key: string;
  isChecked: boolean;
}

interface MainStore {
  selectedHealth: SelectedHealthType;
  setSelectedHealth: ({ key: string, isChecked: boolean }) => void;
  isTopBannerVisible: boolean;
  isBottomBannerVisible: boolean;
  closeTopBanner: () => void;
  closeBottomBanner: () => void;
  resetBanners: () => void;
}

export const useMainStore = create<MainStore>((set, get) => ({
  selectedHealth: { key: 'Diarrhea', isChecked: true },
  setSelectedHealth: (selectedHealth) => set({ selectedHealth }),
  isTopBannerVisible: true,
  isBottomBannerVisible: true,
  closeTopBanner: () => set({ isTopBannerVisible: false }),
  closeBottomBanner: () => set({ isBottomBannerVisible: false }),
  resetBanners: () => set({ isTopBannerVisible: true, isBottomBannerVisible: true })
}))