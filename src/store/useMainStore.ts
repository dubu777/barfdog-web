import {create} from "zustand";
import {SelectedHealthData} from "@/types";
import Cookies from 'js-cookie';

interface MainStore {
  selectedHealth: SelectedHealthData;
  setSelectedHealth: ({ key, isChecked}: SelectedHealthData) => void;
  isTopBannerVisible: boolean;
  isBottomBannerVisible: boolean;
  closeTopBanner: () => void;
  closeBottomBanner: () => void;
  resetBanners: () => void;

  hiddenPopupIds: number[]; // 쿠키에 저장된 팝업 ID
  closedPopups: number[]; // 현재 닫은 팝업 ID
  initializeHiddenPopups: () => void; // 쿠키에서 초기화
  hidePopupForDay: (id: number) => void; // "하루 동안 보지 않기"
  closePopup: (id: number) => void; // 닫기
}

export const useMainStore = create<MainStore>((set) => ({
  selectedHealth: { key: 'Diarrhea', isChecked: true },
  setSelectedHealth: (selectedHealth) => set({ selectedHealth }),
  isTopBannerVisible: false,
  isBottomBannerVisible: true,
  closeTopBanner: () => set({ isTopBannerVisible: false }),
  closeBottomBanner: () => set({ isBottomBannerVisible: false }),
  resetBanners: () => set({ isTopBannerVisible: true, isBottomBannerVisible: true }),
  hiddenPopupIds: [],
  closedPopups: [],
  initializeHiddenPopups: () => {
    const hiddenIds = Cookies.get('hiddenPopups')?.split(',').map(Number) || [];
    set({ hiddenPopupIds: hiddenIds });
  },
  hidePopupForDay: (id) => {
    set((state) => {
      const updatedHiddenIds = [...state.hiddenPopupIds, id];
      Cookies.set('hiddenPopups', updatedHiddenIds.join(','), { expires: 1 });
      return { hiddenPopupIds: updatedHiddenIds };
    });
  },
  closePopup: (id) => {
    set((state) => ({
      closedPopups: [...state.closedPopups, id],
    }));
  },
}))