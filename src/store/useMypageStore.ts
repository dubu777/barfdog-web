import {create} from "zustand";
import { MyPageMemberDto } from "@/types";

const initialUserInfo = {
  grade: '',
  id: 0,
  memberName: '',
  myRecommendationCode: '',
  reward: null,
}

interface MypageStore {
  mypageUserInfo: MyPageMemberDto;
  setMypageUserInfo: (mypageUserInfo: MyPageMemberDto) => void;
  subscriptionDogName: string;
  setSubscriptionDogName: (subscriptionDogName: string) => void;
}

export const useMyPageStore = create<MypageStore>((set, get) => ({
  mypageUserInfo: initialUserInfo,
  setMypageUserInfo: (mypageUserInfo) => set({ mypageUserInfo }),
  subscriptionDogName: '',
  setSubscriptionDogName: (subscriptionDogName) => set({ subscriptionDogName }),
}))