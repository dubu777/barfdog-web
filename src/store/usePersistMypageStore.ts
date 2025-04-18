import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MyPageMemberDto, PaymentItem } from "@/types";
import { MembershipTier } from "@/types/membership";

const initialUserInfo = {
  grade: '',
  id: 0,
  memberName: '',
  myRecommendationCode: '',
  reward: '',
}

const initialState = {
  mypageUserInfo: initialUserInfo,
  subscriptionDogName: '',
  userMembershipTier: null,
  paymentMethodDetail: null,
};


interface MypageStore {
  mypageUserInfo: MyPageMemberDto;
  setMypageUserInfo: (mypageUserInfo: MyPageMemberDto) => void;
  subscriptionDogName: string;
  setSubscriptionDogName: (subscriptionDogName: string) => void;
  userMembershipTier: MembershipTier | null;
  setUserMembershipTier: (userMembershipTier: MembershipTier) => void;
  paymentMethodDetail: PaymentItem | null;
  setPaymentMethodDetail: (paymentMethodDetail: PaymentItem) => void;
}

export const usePersistMypageStore = create(
  persist<MypageStore>(
    (set) => ({
      ...initialState,
      setMypageUserInfo: (mypageUserInfo) => set((state) => ({ ...state, mypageUserInfo })),
      setSubscriptionDogName: (subscriptionDogName) => set((state) => ({ ...state, subscriptionDogName })),
      setUserMembershipTier: (userMembershipTier) => set((state) => ({ ...state, userMembershipTier })),
      setPaymentMethodDetail: (paymentMethodDetail) => set((state) => ({ ...state, paymentMethodDetail })),
    }),
    {
      name: 'mypage',
    }
  )
);