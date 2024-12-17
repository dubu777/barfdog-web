import {create} from "zustand";

interface MypageStore {
  subscriptionDogName: string;
  setSubscriptionDogName: (subscriptionDogName: string) => void;
}

export const useMyPageStore = create<MypageStore>((set, get) => ({
  subscriptionDogName: '',
  setSubscriptionDogName: (subscriptionDogName) => set({ subscriptionDogName }),
}))