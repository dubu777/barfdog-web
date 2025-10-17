import {create} from "zustand";
import Cookies from 'js-cookie';

interface MainStore {
  hiddenPopupIds: number[]; // 쿠키에 저장된 팝업 ID
  closedPopups: number[]; // 현재 닫은 팝업 ID
  initializeHiddenPopups: () => void; // 쿠키에서 초기화
  hidePopupForDay: (id: number) => void; // "하루 동안 보지 않기"
  closePopup: (id: number) => void; // 닫기
}

export const useMainStore = create<MainStore>((set) => ({
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