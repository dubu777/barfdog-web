import {create} from "zustand";

interface MypageStore {
  subscribeDogName: string;
  setSubscribeDogName: (subscribeDogName: string) => void;
}

export const useMypageStore = create<MypageStore>((set, get) => ({
  subscribeDogName: '',
  setSubscribeDogName: (subscribeDogName) => set({ subscribeDogName }),
}))