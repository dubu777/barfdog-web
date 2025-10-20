import { create } from "zustand";
import Cookies from "js-cookie";

interface MainStore {
  hiddenPopupIds: number[]; // 쿠키에 저장된 팝업 ID
  closedPopups: number[]; // 현재 닫은 팝업 ID
  initializeHiddenPopups: (initial: number[]) => void; // SSR에서 전달된 값 주입
  hidePopupForDay: (id: number) => void; // "하루 동안 보지 않기"
  closePopup: (id: number) => void; // 닫기
}

export const useMainStore = create<MainStore>((set) => ({
  hiddenPopupIds: [],
  closedPopups: [],
  initializeHiddenPopups: (initial) => {
    set({ hiddenPopupIds: Array.from(new Set(initial)) });
  },
  hidePopupForDay: (id) => {
    set((state) => {
      const updatedHiddenIds = Array.from(
        new Set([...state.hiddenPopupIds, id])
      );
      Cookies.set("hiddenPopups", updatedHiddenIds.join(","), { expires: 1 });
      return { hiddenPopupIds: updatedHiddenIds };
    });
  },
  closePopup: (id) => {
    set((state) => ({
      closedPopups: Array.from(new Set([...state.closedPopups, id])),
    }));
  },
}));
