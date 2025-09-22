import { Pagination } from "@/types";

// 적립금
type RewardFilterType = 'ALL' | 'SAVED' | 'USED';
type RewardStatus = 'SAVED' | 'USED';

interface RewardInfo {
  name: string;
  rewardAmount: number;
  rewardStatus: RewardStatus;
  createdDate: string;
}

interface RewardList {
  pagination: Pagination;
  rewardList: RewardInfo[];
  totalRewardAmount: number;
}

// 친구 초대 적립금
interface ReferralRewardInfo {
  recommend: string;
  joinedCount: number;
  orderedCount: number;
  totalRewards: number;
}

interface ReferralRewardList {
  referralRewardInfo: ReferralRewardInfo;
  rewardList: RewardInfo[];
  pagination: Pagination;
}

interface SendReferralCode {
  homePageUrl?: string;
  refereeName: string;
  refereePhoneNumber: string;
}

export type {
  RewardFilterType,
  RewardInfo,
  RewardList,
  ReferralRewardList,
  ReferralRewardInfo,
  SendReferralCode,
};