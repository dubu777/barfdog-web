import {create} from "zustand";
import { SelectedHealthData } from "@/types";

interface MainStore {
  selectedHealth: SelectedHealthData;
  setSelectedHealth: ({ key, isChecked}: SelectedHealthData) => void;
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