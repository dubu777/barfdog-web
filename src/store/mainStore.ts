import {create} from "zustand";

export type SelectedHealthType = {
  key: string;
  isChecked: boolean;
}
interface SelectedHealthState {
  selectedHealth: SelectedHealthType;
  setSelectedHealth: ({ key: string, isChecked: boolean }) => void;
}
export const useSelectedHealthStore = create<SelectedHealthState>((set) => ({
  selectedHealth: {
    key: 'Diarrhea',
    isChecked: true,
  },
  setSelectedHealth: (selectedHealth) => set({ selectedHealth })
}))

interface BannerState {
  isTopBannerVisible: boolean;
  isBottomBannerVisible: boolean;
  closeTopBanner: () => void;
  closeBottomBanner: () => void;
  resetBanners: () => void;
}
export const useBannerStore = create<BannerState>((set) => ({
  isTopBannerVisible: true,
  isBottomBannerVisible: true,
  closeTopBanner: () => set({ isTopBannerVisible: false }),
  closeBottomBanner: () => set({ isBottomBannerVisible: false }),
  resetBanners: () => set({ isTopBannerVisible: true, isBottomBannerVisible: true })
}))